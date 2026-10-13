import React, {type ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const SELF_HOSTED_PLANS = ['free', 'enterprise'] as const;
const CLOUD_PLANS = ['free', 'pro', 'family', 'team', 'enterprise'] as const;

type SelfHostedPlan = (typeof SELF_HOSTED_PLANS)[number];
type CloudPlan = (typeof CLOUD_PLANS)[number];

type PlansFrontmatter = {
  selfhosted?: unknown;
  cloud?: unknown;
};

const COPY = {
  ru: {
    selfhosted: 'Self-hosted',
    cloud: 'Cloud',
    missing:
      'TODO: у страницы нет корректного frontmatter plans. Бейдж обязателен на каждой странице.',
    invalid: 'TODO: frontmatter plans содержит неизвестное значение.',
    none: 'нет',
    labels: {
      free: 'Бесплатный',
      pro: 'Pro',
      family: 'Семья',
      team: 'Команда',
      enterprise: 'Предприятие',
    },
    hints: {
      free: 'plan_tier FREE',
      pro: 'plan_tier PREMIUM. В интерфейсе пункт называется «Премиум».',
      family: 'plan_tier FAMILY. В интерфейсе — «Семья».',
      team: 'plan_tier TEAM. В интерфейсе — «Команда».',
      enterprise: 'plan_tier ENTERPRISE. В интерфейсе — «Предприятие».',
    },
  },
  en: {
    selfhosted: 'Self-hosted',
    cloud: 'Cloud',
    missing:
      'TODO: this page has no valid plans frontmatter. The badge is required on every page.',
    invalid: 'TODO: plans frontmatter contains an unknown value.',
    none: 'none',
    labels: {
      free: 'Free',
      pro: 'Pro',
      family: 'Family',
      team: 'Team',
      enterprise: 'Enterprise',
    },
    hints: {
      free: 'plan_tier FREE',
      pro: 'plan_tier PREMIUM. The product UI calls this Premium.',
      family: 'plan_tier FAMILY',
      team: 'plan_tier TEAM',
      enterprise: 'plan_tier ENTERPRISE',
    },
  },
} as const;

function parsePlans<T extends string>(
  value: unknown,
  allowed: readonly T[],
): {ok: true; plans: T[]} | {ok: false} {
  if (!Array.isArray(value)) {
    return {ok: false};
  }
  const plans: T[] = [];
  for (const item of value) {
    if (typeof item !== 'string' || !allowed.includes(item as T)) {
      return {ok: false};
    }
    plans.push(item as T);
  }
  return {ok: true, plans};
}

function PlanRow<T extends string>({
  channel,
  allowed,
  active,
  labels,
  hints,
  noneLabel,
}: {
  channel: string;
  allowed: readonly T[];
  active: readonly T[];
  labels: Record<string, string>;
  hints: Record<string, string>;
  noneLabel: string;
}): ReactNode {
  const activeSet = new Set(active);
  return (
    <div className="plan-badges__row">
      <span className="plan-badges__channel">{channel}</span>
      {allowed.length === 0 ? (
        <span className="plan-chip">{noneLabel}</span>
      ) : (
        allowed.map((plan) => (
          <span
            key={plan}
            className={activeSet.has(plan) ? 'plan-chip plan-chip--on' : 'plan-chip'}
            title={hints[plan]}
          >
            {labels[plan] ?? plan}
          </span>
        ))
      )}
    </div>
  );
}

export default function PlanBadges(): ReactNode {
  const {frontMatter} = useDoc();
  const {i18n} = useDocusaurusContext();
  const copy = i18n.currentLocale === 'en' ? COPY.en : COPY.ru;
  const plans = frontMatter.plans as PlansFrontmatter | undefined;

  if (!plans || typeof plans !== 'object' || Array.isArray(plans)) {
    return <div className="plan-badges plan-badges--missing">{copy.missing}</div>;
  }

  const selfhosted = parsePlans<SelfHostedPlan>(plans.selfhosted, SELF_HOSTED_PLANS);
  const cloud = parsePlans<CloudPlan>(plans.cloud, CLOUD_PLANS);
  if (!selfhosted.ok || !cloud.ok) {
    return <div className="plan-badges plan-badges--missing">{copy.invalid}</div>;
  }

  return (
    <div className="plan-badges" data-plan-badge="true">
      <PlanRow
        channel={copy.selfhosted}
        allowed={SELF_HOSTED_PLANS}
        active={selfhosted.plans}
        labels={copy.labels}
        hints={copy.hints}
        noneLabel={copy.none}
      />
      <PlanRow
        channel={copy.cloud}
        allowed={CLOUD_PLANS}
        active={cloud.plans}
        labels={copy.labels}
        hints={copy.hints}
        noneLabel={copy.none}
      />
    </div>
  );
}
