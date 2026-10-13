/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Swizzled so the docs-line banner names the current Okkey release
 * and does not suggest switching to the same version.
 */

import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDocsVersion} from '@docusaurus/plugin-content-docs/client';
import type {Props} from '@theme/DocVersionBanner';

export default function DocVersionBanner({className}: Props): ReactNode {
  const versionMetadata = useDocsVersion();
  if (!versionMetadata.banner) {
    return null;
  }
  return (
    <div
      className={clsx(
        className,
        ThemeClassNames.docs.docVersionBanner,
        'alert alert--info margin-bottom--md',
      )}
      role="note">
      <Translate
        id="theme.docs.versions.unreleasedVersionLabel"
        description="The label used to tell the user which Okkey release this docs line tracks"
        values={{
          versionLabel: <b>{versionMetadata.label}</b>,
        }}>
        {'Docs line {versionLabel}. The current Okkey release in this line is 1.0.0-beta.1.'}
      </Translate>
    </div>
  );
}
