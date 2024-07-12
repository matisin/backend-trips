ARG NODE_ENV=dev
FROM node:18.20.0-alpine as base
LABEL author="matias medina" maintainer="matias.medina.s2@gmail.com"
ENV TZ=America/Santiago

RUN npm i -g pnpm@8.3.0
ENV PNPM_HOME=/usr/local/bin

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /workspace
COPY tsconfig.build.json \
     tsconfig.json \
     entrypoint.sh \
     package.json \
     pnpm-lock.yaml \
     eslint.config.mjs \
     migrate-mongo-config.js ./

COPY migrations ./migrations

EXPOSE 3000

ENTRYPOINT [ "./entrypoint.sh" ]

FROM base as dev

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY src ./src
RUN pnpm build

FROM base as production

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
COPY --from=dev /workspace/dist ./dist

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

ENV BUILD prod
