import React, {type ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const PLANS = ['free', 'enterprise'] as const;

type PlanId = (typeof PLANS)[number];

const COPY = {
  ru: {
    label: 'Тариф',
    missing:
      'TODO: у страницы нет корректного frontmatter plans. Бейдж обязателен на каждой странице.',
    invalid: 'TODO: frontmatter plans содержит неизвестное значение.',
    labels: {
      free: 'Бесплатный',
      enterprise: 'Предприятие',
    },
    hints: {
      free: 'Тариф Free. Его получает установка, которую вы делаете сами.',
      enterprise: 'Тариф Enterprise. Его настраивает сотрудник Okkey.',
    },
  },
  en: {
    label: 'Plan',
    missing:
      'TODO: this page has no valid plans frontmatter. The badge is required on every page.',
    invalid: 'TODO: plans frontmatter contains an unknown value.',
    labels: {
      free: 'Free',
      enterprise: 'Enterprise',
    },
    hints: {
      free: 'Free. You get this plan when you install Okkey yourself.',
      enterprise: 'Enterprise. An Okkey employee sets this plan up.',
    },
  },
} as const;

function parsePlans(value: unknown): {ok: true; plans: PlanId[]} | {ok: false} {
  if (!Array.isArray(value)) {
    return {ok: false};
  }
  const plans: PlanId[] = [];
  for (const item of value) {
    if (typeof item !== 'string' || !PLANS.includes(item as PlanId)) {
      return {ok: false};
    }
    plans.push(item as PlanId);
  }
  return {ok: true, plans};
}

export default function PlanBadges(): ReactNode {
  const {frontMatter} = useDoc();
  const {i18n} = useDocusaurusContext();
  const copy = i18n.currentLocale === 'en' ? COPY.en : COPY.ru;
  const parsed = parsePlans(frontMatter.plans);

  if (!parsed.ok) {
    const message =
      frontMatter.plans === undefined ? copy.missing : copy.invalid;
    return <div className="plan-badges plan-badges--missing">{message}</div>;
  }

  const active = new Set(parsed.plans);
  return (
    <div className="plan-badges" data-plan-badge="true">
      <div className="plan-badges__row">
        <span className="plan-badges__channel">{copy.label}</span>
        {PLANS.map((plan) => (
          <span
            key={plan}
            className={active.has(plan) ? 'plan-chip plan-chip--on' : 'plan-chip'}
            title={copy.hints[plan]}
          >
            {copy.labels[plan]}
          </span>
        ))}
      </div>
    </div>
  );
}
