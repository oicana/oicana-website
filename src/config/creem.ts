export type BillingCycle = "monthly" | "annual";

export interface Tier {
	name: string;
	description: string;
	criteria: string;
	prices: Record<BillingCycle, string>;
	checkoutUrls: Record<BillingCycle, string>;
}

const env = import.meta.env;

export const TIERS: Tier[] = [
	{
		name: "Startup",
		description: "For small companies and individuals",
		criteria: "Up to €2M yearly revenue",
		prices: {
			monthly: "19.00€",
			annual: "193.80€",
		},
		checkoutUrls: {
			monthly: env.PUBLIC_CREEM_CHECKOUT_STARTUP_MONTHLY ?? "",
			annual: env.PUBLIC_CREEM_CHECKOUT_STARTUP_ANNUAL ?? "",
		},
	},
	{
		name: "Scaleup",
		description: "For growing companies",
		criteria: "Up to €25M yearly revenue",
		prices: {
			monthly: "49.00€",
			annual: "499.80€",
		},
		checkoutUrls: {
			monthly: env.PUBLIC_CREEM_CHECKOUT_SCALEUP_MONTHLY ?? "",
			annual: env.PUBLIC_CREEM_CHECKOUT_SCALEUP_ANNUAL ?? "",
		},
	},
	{
		name: "Enterprise",
		description: "For large organizations",
		criteria: "Above €25M yearly revenue",
		prices: {
			monthly: "99.00€",
			annual: "1009.80€",
		},
		checkoutUrls: {
			monthly: env.PUBLIC_CREEM_CHECKOUT_ENTERPRISE_MONTHLY ?? "",
			annual: env.PUBLIC_CREEM_CHECKOUT_ENTERPRISE_ANNUAL ?? "",
		},
	},
];
