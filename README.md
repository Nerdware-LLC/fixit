<div align="center">

🚧 This README is a work in progress 🚧

Fixit is a SaaS product that provides users with powerful tools for managing maintenance and repair workflows, including in-app payments powered by [Stripe](https://stripe.com/). This repo is home to the Fixit monorepo.

Author: [Trevor Anderson](https://github.com/trevor-anderson), Solopreneur & Founder of [Nerdware](https://github.com/Nerdware-LLC)

[<img src="docs/images/powered_by_Stripe_blurple.svg" height="22" style="position:relative;top:1px;" alt="Powered by Stripe" />](https://stripe.com/ "Check out Stripe")
&nbsp;
[![GraphQL][graphql-badge]](https://graphql.org/ "graphql.org")
&nbsp;
[![Apollo][apollo-badge]](https://www.apollographql.com/ "apollographql.com")
&nbsp;
[![OpenAPI][open-api-badge]](https://spec.openapis.org/oas/latest.html "spec.openapis.org/oas/latest")
&nbsp;
[![Express][express-badge]](https://expressjs.com/ "expressjs.com")
&nbsp;
[![pre-commit][pre-commit-badge]](https://pre-commit.com "pre-commit.com")
&nbsp;
[![License: Proprietary][license-badge]](/LICENSE "View License")

<!--   BADGE LINKS   -->

[graphql-badge]: https://img.shields.io/badge/GraphQL-E10098.svg?logo=graphql&logoColor=E10098&labelColor=454545
[apollo-badge]: https://img.shields.io/badge/Apollo_Server_v4-311C87.svg?logo=apollo-graphql&labelColor=454545
[open-api-badge]: https://img.shields.io/badge/OpenAPI%20v3.1-609531?logo=openapiinitiative&labelColor=454545
[express-badge]: https://img.shields.io/badge/Express_v4-7B7B7B.svg?logo=express&logoColor=FFF&labelColor=454545
[pre-commit-badge]: https://img.shields.io/badge/pre--commit-F8B424.svg?logo=pre-commit&logoColor=F8B424&labelColor=454545
[license-badge]: https://img.shields.io/badge/license-Proprietary-000080.svg?labelColor=454545

</div>
<br>

- [🗺️ Project Overview](#️-project-overview)
- [📦 CI/CD Pipeline](#-cicd-pipeline)
  - [GitHub Actions](#github-actions)
  - [Git Workflow](#git-workflow)
- [📝 License](#-license)
- [💬 Contact](#-contact)

## 🗺️ Project Overview

The Fixit API provides a robust, scalable, and secure backend for the Fixit SaaS product, which provides users with powerful tools for managing maintenance and repair workflows, including in-app payments powered by [Stripe](https://stripe.com/).

> [!NOTE]
>
> ### Quick Links
>
> <!-- FIXME Update this section -->
>
> <table align="center">
>   <tr>
>   <td align="center">
>
> [<img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png" width="70" alt="Check out the Fixit REST API OpenAPI Schema on SwaggerHub" />](https://app.swaggerhub.com/apis/Nerdware/Fixit "Check out the Fixit REST API OpenAPI Schema on SwaggerHub")
>
> [<code>Fixit REST API OpenAPI</code><br><code>Schema Explorer</code>](https://app.swaggerhub.com/apis/Nerdware/Fixit "Check out the Fixit REST API OpenAPI Schema on SwaggerHub")
>
>   </td>
>   <td align="center">
>
> [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/220px-GraphQL_Logo.svg.png" width="70" alt="Check out the Fixit GraphQL API Schema-Explorer on Apollo Studio" />](https://studio.apollographql.com/public/fixit/variant/current "Check out the Fixit GraphQL API Schema-Explorer on Apollo Studio")
>
> [<code>Fixit GraphQL API</code><br><code>Schema Explorer</code>](https://studio.apollographql.com/public/fixit/variant/current "Check out the Fixit GraphQL API Schema-Explorer on Apollo Studio")
>
>   </td>
>   <td align="center">
>
> [<img src="https://avatars.githubusercontent.com/u/22632046?s=200&v=4" width="70" alt="Check out the Fixit front-end Storybook on Chromatic" />](https://main--659981450c81cefabec86fa2.chromatic.com "Check out the Fixit front-end Storybook on Chromatic")
>
> [<code>Fixit Frontend</code><br><code>Component Storybook</code>](https://main--659981450c81cefabec86fa2.chromatic.com "Check out the Fixit front-end Storybook on Chromatic")
>
>   </td>
>   <td align="center">
>
> [<img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" width="70" alt="Check out the Fixit web app GitHub repo" />](https://github.com/Nerdware-LLC/fixit-web#readme "Check out the Fixit web app GitHub repo")
>
> [<code>Fixit Web App</code><br><code>GitHub Repo</code>](https://github.com/Nerdware-LLC/fixit-web#readme "Check out the Fixit web app GitHub repo")
>
>   </td>
>   </tr>
> </table>

## 📦 CI/CD Pipeline

<!-- An outline of this process is below. -->

<!-- TODO Add screenshot image of pipeline_production workflow in action -->

### GitHub Actions

<!-- TODO Ensure below paths are right once GH Actions files have the "FIXME_" prefix rm'd -->

This project's CI/CD pipeline uses GitHub Actions to [test](/.github/workflows/fixit-api.test.yaml), [release](/.github/workflows/fixit-api.release.yaml), and [deploy](/.github/workflows/fixit-api.deploy.yaml) code changes.

### Git Workflow

This project uses uses [GitHub Flow](https://guides.github.com/introduction/flow/) to deploy two live environments - staging and production - both of which are associated with a Git branch for releases:

| Environment | Release Branch |                   Permits `git push`                   |
| :---------- | :------------: | :----------------------------------------------------: |
| staging     |      next      | <span style="color:#66FF00;font-size:1.5rem;">✓</span> |
| production  |      main      |                           ❌                           |

Project versioning and the [CHANGELOG.md](./CHANGELOG.md) are managed automatically via GitHub Actions and nx.

For more information on how new code is integrated and deployed, check out the guide to [CONTRIBUTING](./CONTRIBUTING.md).

## 📝 License

All files, scripts, and source code contained herein are proprietary use only by Nerdware, LLC.

See [LICENSE](/LICENSE) for more information.

<div align="center">

## 💬 Contact

Trevor Anderson — [Trevor@Nerdware.cloud](mailto:trevor@nerdware.cloud) — [@TeeRevTweets](https://twitter.com/teerevtweets)

[<img src="https://github.com/trevor-anderson/trevor-anderson/blob/main/assets/YouTube_icon_circle.svg" height="40" alt="Check out Nerdware on YouTube" />](https://www.youtube.com/@nerdware-io)
&emsp;
[<img src="https://github.com/trevor-anderson/trevor-anderson/blob/main/assets/LinkedIn_icon_circle.svg" height="40" alt="Trevor Anderson's LinkedIn" />](https://www.linkedin.com/in/meet-trevor-anderson/)
&emsp;
[<img src="https://github.com/trevor-anderson/trevor-anderson/blob/main/assets/Twitter_icon_circle.svg" height="40" alt="Trevor Anderson's Twitter" />](https://twitter.com/TeeRevTweets)
&emsp;
[<img src="https://github.com/trevor-anderson/trevor-anderson/blob/main/assets/email_icon_circle.svg" height="40" alt="Email Trevor Anderson" />](mailto:trevor@nerdware.cloud)

[**_Dare Mighty Things._**](https://www.youtube.com/watch?v=GO5FwsblpT8)

</div>
