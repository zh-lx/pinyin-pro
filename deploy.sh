#!/usr/bin/env bash
set -euo pipefail

: "${DEPLOY_HOST:?DEPLOY_HOST is required}"
: "${DEPLOY_PATH:?DEPLOY_PATH is required}"

deploy_port="${DEPLOY_PORT:-22}"
ssh_options=(-p "${deploy_port}" -o StrictHostKeyChecking=accept-new)
scp_options=(-P "${deploy_port}" -o StrictHostKeyChecking=accept-new)
ssh_cmd=(ssh "${ssh_options[@]}")
scp_cmd=(scp "${scp_options[@]}")

if [[ -n "${SERVER_PASSWORD:-}" ]]; then
  if ! command -v sshpass >/dev/null 2>&1; then
    echo "sshpass is required when SERVER_PASSWORD is set." >&2
    exit 1
  fi

  export SSHPASS="${SERVER_PASSWORD}"
  ssh_cmd=(sshpass -e "${ssh_cmd[@]}")
  scp_cmd=(sshpass -e "${scp_cmd[@]}")
fi

archive_path="./packages/docs/dist.zip"
if [[ ! -f "${archive_path}" ]]; then
  echo "${archive_path} does not exist. Run pnpm build:docs first." >&2
  exit 1
fi

remote_path="$(printf '%q' "${DEPLOY_PATH}")"

"${scp_cmd[@]}" "${archive_path}" "${DEPLOY_HOST}:${DEPLOY_PATH}/dist.zip"
"${ssh_cmd[@]}" "${DEPLOY_HOST}" << EOF
  set -e
  cd ${remote_path}
  rm -rf zh en
  unzip -q dist.zip
  rm -f dist.zip
EOF
