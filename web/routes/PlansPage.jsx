import { Page, Layout } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useNavigate } from "react-router-dom";
import { useMantle } from '@heymantle/react';
import { PlanCardStack, PlanCardType } from '@heymantle/polaris';

export default function () {
  const navigate = useNavigate();

  const { customer, plans, subscribe } = useMantle();

  return (
    <Page
      title="Plans"
      backAction={{
        content: "Shop Information",
        onAction: () => navigate("/"),
      }}
    >
      <TitleBar title="Select a plan" />
      <Layout>
        <Layout.Section>
          <PlanCardStack
            cardType={PlanCardType.Highlighted}
            customer={customer}
            plans={plans}
            onSelectPlan={async ({ plan, discount }) => {
              const subscription = await subscribe({ planId: plan.id, discountId: discount?.id, returnUrl: '/plans' });
              if (subscription.error) {
                console.error('Unable to subscribe: ', subscription.error);
              } else {
                open(subscription.confirmationUrl, "_top");
              }
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}