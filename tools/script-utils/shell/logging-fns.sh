#!/usr/bin/env bash
###############################################################################
# SHELL UTIL FNS — LOGGING
#
# 	This file is source'd by other shell scripts to provide logging util fns.
#
# USAGE: `source tools/script-utils/shell/logging-fns.sh`
#
###############################################################################

# Print args to stdout. (ANSI: \e[96m is light-cyan text, \e[0m is reset)
function log_info() {
	printf '\e[96m%b\e[0m\n' "${@}"
}

# Print err-msg args to stdout+stderr, and exit. (ANSI: \e[31m is red text)
function throw_error() {
	printf >&2 '\e[31m%b\e[0m\n' "🚨 ERROR: $1" "${@:2}" '(EXIT 1)'
	exit 1
}

###############################################################################
