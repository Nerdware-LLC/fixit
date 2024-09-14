#!/usr/bin/env bash
###############################################################################
# SHELL UTIL FNS — EXECUTION CONTEXT VALIDATION
#
# 	This file is source'd by other shell scripts to provide utility functions
# 	which handle script execution context validation.
#
# USAGE: `source tools/script-utils/shell/exec-ctx-validation-fns.sh`
#
###############################################################################

# Ensure the necessary logging util fns are available
if ! type log_info 1>/dev/null || ! type throw_error 1>/dev/null; then
	source tools/script-utils/shell/logging-fns.sh || exit 1
fi

# Ensure the `npx` command is available for script execution.
function ensure_npx_cmd_is_present() {
	if ! type npx 1>/dev/null; then
		# Try invoking `nvm` to make it available
		type nvm 1>/dev/null && nvm use 1>/dev/null
		# If `npx` is still not available, throw an error
		! type npx &&
			throw_error 'Unable to proceed with script execution — npx command not found.'
	fi
}

# Validate the script execution context; this fn asserts the following:
# 	1. The PWD is the monorepo root.
# 	2. The init script ($0) was invoked as expected.
#	3. The `npx` command is available (if the '--require-npx' flag is provided).
#
# 	Options:
#   	'--require-npx': Pass '--require-npx' to ensure the `npx` command is available
function validate_exec_context() {
	# First ensure all scripts are run from the monorepo root
	[ "$(basename "$PWD")" != 'fixit' ] && throw_error \
		'Unexpected execution context — please run this script from the monorepo root.'

	local _sh_init_script="$0"
	local _sh_init_script_expected="${BASH_SOURCE[1]}"

	# shellcheck disable=SC2016
	[ "$_sh_init_script" != "$_sh_init_script_expected" ] && throw_error \
		'Unexpected execution context — $0 indicates this script was not run as intended.\n' \
		"\tExpected \$0: $_sh_init_script_expected" \
		"\tActual   \$0: $_sh_init_script\n"

	# If the '--require-npx' flag is provided, invoke ensure_npx_cmd_is_present
	[[ "${*}" == *--require-npx* ]] && ensure_npx_cmd_is_present
}

###############################################################################
