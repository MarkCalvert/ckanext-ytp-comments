# ckanext-ytp-comments
A custom CKAN extension for Data.Qld

[![CircleCI](https://circleci.com/gh/qld-gov-au/ckanext-ytp-comments/tree/develop.svg?style=shield)](https://circleci.com/gh/qld-gov-au/ckanext-ytp-comments/tree/develop)

## Local environment setup
- Make sure that you have latest versions of all required software installed:
  - [Docker](https://www.docker.com/)
  - [Pygmy](https://pygmy.readthedocs.io/)
  - [Ahoy](https://github.com/ahoy-cli/ahoy)
- Make sure that all local web development services are shut down (Apache/Nginx, Mysql, MAMP etc).
- Checkout project repository (in one of the [supported Docker directories](https://docs.docker.com/docker-for-mac/osxfs/#access-control)).  
- `pygmy up`
- `ahoy build`

Use `admin`/`password` to login to CKAN.

## Available `ahoy` commands
Run each command as `ahoy <command>`.
  ```  
   build        Build or rebuild project.
   clean        Remove containers and all build files.
   cli          Start a shell inside CLI container or run a command.
   doctor       Find problems with current project setup.
   down         Stop Docker containers and remove container, images, volumes and networks.
   flush-redis  Flush Redis cache.
   info         Print information about this project.
   install-site Install a site.
   lint         Lint code.
   logs         Show Docker logs.
   pull         Pull latest docker images.
   reset        Reset environment: remove containers, all build, manually created and Drupal-Dev files.
   restart      Restart all stopped and running Docker containers.
   start        Start existing Docker containers.
   stop         Stop running Docker containers.
   test-bdd     Run BDD tests.
   test-unit    Run unit tests.
   up           Build and start Docker containers.
  ```

## Coding standards
Python code linting uses [flake8](https://github.com/PyCQA/flake8) with configuration captured in `.flake8` file.   

Set `ALLOW_LINT_FAIL=1` in `.env` to allow lint failures.

## Nose tests
`ahoy test-unit`

Set `ALLOW_UNIT_FAIL=1` in `.env` to allow unit test failures.

## Behavioral tests
`ahoy test-bdd`

Set `ALLOW_BDD_FAIL=1` in `.env` to allow BDD test failures.

### How it works
We are using [Behave](https://github.com/behave/behave) BDD _framework_ with additional _step definitions_ provided by [Behaving](https://github.com/ggozad/behaving) library.

Custom steps described in `test/features/steps/steps.py`.

Test scenarios located in `test/features/*.feature` files.

Test environment configuration is located in `test/features/environment.py` and is setup to connect to a remote Chrome
instance running in a separate Docker container. 

During the test, Behaving passes connection information to [Splinter](https://github.com/cobrateam/splinter) which
instantiates WebDriver object and establishes connection with Chrome instance. All further communications with Chrome 
are handled through this driver, but in a developer-friendly way.

For a list of supported step-definitions, see https://github.com/ggozad/behaving#behavingweb-supported-matcherssteps.

## Automated builds (Continuous Integration)
In software engineering, continuous integration (CI) is the practice of merging all developer working copies to a shared mainline several times a day. 
Before feature changes can be merged into a shared mainline, a complete build must run and pass all tests on CI server.

This project uses [Circle CI](https://circleci.com/) as a CI server: it imports production backups into fully built codebase and runs code linting and tests. When tests pass, a deployment process is triggered for nominated branches (usually, `master` and `develop`).

Add `[skip ci]` to the commit subject to skip CI build. Useful for documentation changes.

### SSH
Circle CI supports shell access to the build for 120 minutes after the build is finished when the build is started with SSH support. Use "Rerun job with SSH" button in Circle CI UI to start build with SSH support.

## Follow / Mute comments

Comment notifications (via email) are managed by opt-in, i.e. without opting in to receive comment notifications at the content item or thread level, only authors or organisation admins will receive email notifications. 

This feature allows users to following or mute comments at the content item level or for a specific comment thread on the content item.

When a user follows comments on a content item or content item thread they will receive email notifications when new comments or replies are posted.

### Setup

1. Initialise the comment notification receipients database table, e.g.

        cd /usr/lib/ckan/default/src/ckanext-ytp-comments # Your PATH may vary
        
        paster init_notifications_db -c /etc/ckan/default/development.ini # Use YOUR path and relevant CKAN .ini file

    This will create a new table in the CKAN database named `comment_notification_recipient` that holds the status of individual user's follow or mute preferences.
    
    *Note:* if your deployment process does not run `python setup.py develop` after deploying code changes for extensions, you may need to run this in order for paster to recognise the `init_notifications_db` command:

        python setup.py develop

2. Add the following config setting to your CKAN `.ini` file:

        ckan.comments.follow_mute_enabled = True

3. Restart CKAN

