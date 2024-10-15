# syntax=docker/dockerfile:1
###############################################################################
# IMAGE: nerdware/fixit-api
#
# This Dockerfile is used to create a production image for the Fixit API AWS
# ECS Service. The image is built in two stages:
#     1. builder:  organizes nx dist/ artifacts for "prod" build stage
#     2. prod:     creates the final "prod" image for ECS tasks
#
# After being uploaded to the AWS ECR image repo by the relevant GitHub Action,
# the image is scanned for conformance with relevant CIS benchmarks and other
# security standards. Once all checks pass, the image is deployed to AWS ECS.
###############################################################################
# STAGE: builder

# Source image: NodeJS v20 (https://hub.docker.com/_/node)
FROM node:20 AS builder

# Explicitly set workdir
WORKDIR /home/node/app

# Copy over files needed to create the dist build:
COPY dist/apps/fixit-api/* ./

# Install prod runtime dependencies (pruned for good measure)
RUN npm ci --omit=dev && npm prune --production

#------------------------------------------------------------------------------
# STAGE: prod

# This build stage creates the final "prod" image for ECS tasks
FROM node:20-slim AS prod

# Expose desired port
EXPOSE 80

# Explicitly set workdir
WORKDIR /home/node/app

# Add Tini for improved Node process handling https://github.com/krallin/tini
ENV TINI_VERSION=v0.19.0
RUN apt-get update \
  && apt-get install -y ca-certificates curl --no-install-recommends \
  && curl -L https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini -o /tini \
  && chmod +x /tini \
  && echo "Tini downloaded successfully" \
  && apt-get purge -y ca-certificates curl \
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*
ENTRYPOINT ["/tini", "--"]

# Copy over the package.json
COPY --from=builder /home/node/app/package.json ./

# Copy over only the dist file needed in production
COPY --from=builder /home/node/app/index.js ./index.js

# Copy over only the pruned node_modules from builder stage
COPY --from=builder /home/node/app/node_modules ./node_modules/

# Set non-root user (this step must be after tini-setup)
USER node

# Run the API directly with node executable
CMD ["node", "./index.js"]

###############################################################################
