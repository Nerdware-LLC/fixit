#!/usr/bin/env bash
###############################################################################
# SHELL UTIL FNS — TMP MANAGEMENT
#
# 	This file is source'd by other shell scripts to provide utility functions
# 	which handle temporary file/directory management.
#
# USAGE: `source tools/script-utils/shell/tmp-mgmt-fns.sh`
#
###############################################################################

# Sets up a temporary directory via the following steps:
# 	1. Create a tmp dir.
#   2. Export the tmp dir path under the name 'TMP_DIR'.
# 	3. Setup a trap to auto-remove TMP_DIR on script exit.
# 	3. echo's the TMP_DIR path to stdout.
#
# 	Options:
#   	DEBUG_MODE: Set this env var to 'true' to prevent the removal of TMP_DIR on exit.
#
# shellcheck disable=SC2120
function setup_tmp_dir() {
	local init_script_basename="$(basename "$0")"

	# Global var:
	readonly TMP_DIR="$(basename "$(
		mktemp --tmpdir="$PWD" -d "tmp.${init_script_basename%.sh}.XXX" ||
			throw_error 'Failed to create temporary directory.'
	)")"

	# Export the tmp dir path:
	export TMP_DIR

	# TRAP — on EXIT, remove the tmp dir unless DEBUG_MODE env var is true.
	# shellcheck disable=SC2317
	function rm_tmp_unless_debug() {
		if [ "$DEBUG_MODE" == 'true' ]; then
			log_info "Debug mode enabled. Not removing tmp dir \e[0m$TMP_DIR"
		else
			rm -rf "$TMP_DIR"
		fi
	}

	trap rm_tmp_unless_debug EXIT

	# Lastly, echo TMP_DIR to help invocations avoid "where-does-TMP_DIR-come-from" confusion.
	echo "$TMP_DIR"
}

###############################################################################
