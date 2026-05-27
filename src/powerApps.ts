import { getContext, setConfig, type IContext } from '@microsoft/power-apps/app';

let contextPromise: Promise<IContext | null> | undefined;

setConfig({
  logger: {
    logMetric: (metric) => {
      if (import.meta.env.DEV) {
        console.debug('[Power Apps metric]', metric);
      }
    },
  },
});

export function getPowerAppsContext() {
  contextPromise ??= getContext().catch((error) => {
    if (import.meta.env.DEV) {
      console.info('[Power Apps] Running outside a Power Apps host.', error);
    }

    return null;
  });

  return contextPromise;
}

export async function getPowerAppsUserPrincipalName() {
  const context = await getPowerAppsContext();
  return context?.user.userPrincipalName ?? null;
}
