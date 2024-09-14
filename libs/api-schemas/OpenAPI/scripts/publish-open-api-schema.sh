#!/usr/bin/env bash
###############################################################################
readonly script_name='Publish Fixit OpenAPI Schema'

# Script constants:
readonly oas_dir='libs/api-schemas/OpenAPI'
readonly schema_file="$oas_dir/schema/open-api-schema.yaml"
readonly oas_scripts_dir="$oas_dir/scripts"
readonly expected_bash_src="$oas_scripts_dir/publish-open-api-schema.sh"

readonly script_help="
SCRIPT:	$script_name

	This script updates the Fixit OpenAPI schema in SwaggerHub.

	> Schema Input:  $schema_file

USAGE:

	$expected_bash_src --version=<git-ref> [OPTIONS]

OPTIONS:
	--version=     The schema version to use for publishing the schema (required).
	--update       Update the schema if the version already exists.
	--setdefault   Publish the schema as the new default version (default: false).
	               Use this flag when publishing from a production release.
	--dry-run      Run the script, but do not publish the schema to SwaggerHub.
	--debug	       Prevent removal of temporary files on exit (default: false).
	-h, --help     Display this help message and exit.
"
###############################################################################
# PARSE SCRIPT ARGS/OPTIONS

# If a 'help' flag was provided, log the help message and exit
[[ "${*}" =~ (-h|help) ]] && echo "$script_help" && exit 0

readonly version_arg="$(grep -oPm1 '(?<=--version(=|\s))\S+' <<<"$*")"

readonly update_if_exists="$([[ "${*}" == *--update* ]] && echo true || echo false)"

readonly set_default="$([[ "${*}" == *--setdefault* ]] && echo true || echo false)"

readonly dry_run="$([[ "${*}" == *--dry-run* ]] && echo true || echo false)"

readonly DEBUG_MODE="$([[ "${*}" == *--debug* ]] && echo true || echo false)"
export DEBUG_MODE

###############################################################################
# SCRIPT EXECUTION FUNCTIONS

source tools/script-utils/shell/logging-fns.sh || exit 1
source tools/script-utils/shell/exec-ctx-validation-fns.sh || exit 1
source tools/script-utils/shell/tmp-mgmt-fns.sh || exit 1

function validate_version_arg() {
	[ -z "$version_arg" ] &&
		throw_error "Missing required script argument: --version"

	[[ ! "$version_arg" =~ [\w.-]+ ]] &&
		throw_error "Invalid --version value. Must be a valid git ref."

	# If version is valid, set global var 'version'
	readonly version="$version_arg"
}

function validate_openapi_schema() {
	npx redocly lint "$schema_file" &>/dev/null ||
		throw_error 'The OpenAPI schema is invalid.'
}

function create_bundled_schema_file() {
	log_info 'Bundling the schema for publication ...'

	# Global vars:
	readonly tmp_bundled_schema_file="$TMP_DIR/open-api-schema-bundle.yaml"

	npx redocly bundle "$schema_file" --output "$tmp_bundled_schema_file" 1>/dev/null

	# Throw error if the bundled-schema-file was not generated
	[[ $? != 0 || ! -f "$tmp_bundled_schema_file" ]] &&
		throw_error 'Failed to create schema bundle for publication.'
}

function publish_schema_unless_dry_run() {
	# First, check if dry-run mode is enabled
	if [ "$dry_run" == 'true' ]; then
		log_info 'Dry-run mode enabled. Skipping schema publication.'
		return 0
	fi

	log_info "Publishing the OpenAPI schema to SwaggerHub ..."

	# SwaggerHub CLI args:
	local schema_ref="Nerdware/Fixit/$version"
	local swaggerhub_cli_args=(
		"$schema_ref"
		"--file=$tmp_bundled_schema_file"
		'--visibility=public'
	)

	# SwaggerHub CLI args for updating the default version:
	[ "$set_default" == 'true' ] && swaggerhub_cli_args+=(
		'--setdefault'
		'--published=publish'
	)

	# Try to create a new schema version, capture stdout+stderr
	local output="$(npx swaggerhub api:create "${swaggerhub_cli_args[@]}" 2>&1)"

	# If the 'api:create' operation succeeded, log success msg and end script
	if [[ "$output" != *Error* ]]; then
		log_info "New schema version '$version' published successfully! 🚀"
		return 0
	fi

	# If it failed bc of anything other than "the version already exists", throw error
	[[ "$output" != *"API version '$schema_ref' already exists"* ]] &&
		throw_error 'Failed to publish the schema to SwaggerHub.' "$output"

	# If the version already exists, but "update-mode" is not enabled, throw error
	[ "$update_if_exists" != 'true' ] && throw_error \
		"Schema version '$version' already exists, but the --update flag was not provided." \
		'Use the --update flag to update an existing version.'

	log_info "Schema version '$version' already exists." \
		'Attempting to update the existing version ...'

	# Try again using 'api:update' instead of 'api:create'
	npx swaggerhub api:update "${swaggerhub_cli_args[@]}"
}

###############################################################################
# SCRIPT EXECUTION

log_info "[publish-open-api-schema.sh] Starting Script ..."

validate_exec_context "$expected_bash_src" --require-npx
validate_version_arg
validate_openapi_schema
setup_tmp_dir
create_bundled_schema_file
publish_schema_unless_dry_run

###############################################################################
