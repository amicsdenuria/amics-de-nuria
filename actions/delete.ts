import { MultipleMutationResult } from 'next-sanity';
import { adminClient } from '@/sanity/lib/client';

export interface DeleteASDFResult {
  ok: boolean;
  message?: string;
  deletedSubscribers?: number;
  deletedSubscriptions?: number;
  result?: MultipleMutationResult;
  error?: unknown;
}

export const deleteasdf = async (): Promise<DeleteASDFResult> => {
  const email = 'genismuner+1@gmail.com';
  try {
    // 1) Obtener subscribers que tengan ese email
    const subscribers: { _id: string }[] = await adminClient.fetch(
      '*[_type == "subscriber" && email == $email]{_id}',
      { email },
    );
    const subscriberIds = subscribers.map((s) => s._id);

    // 2) Obtener subscriptions que apunten a esos subscribers O que tengan el mismo email
    const subscriptions: { _id: string }[] = await adminClient.fetch(
      '*[_type == "subscription" && (subscriber._ref in $subscriberIds || email == $email)]{_id}',
      { subscriberIds, email },
    );
    const subscriptionIds = subscriptions.map((s) => s._id);

    // Si no hay nada que hacer, salimos
    if (subscriberIds.length === 0 && subscriptionIds.length === 0) {
      return {
        ok: true,
        message:
          'No se encontraron subscriber ni subscriptions para ese email.',
      };
    }

    // 3) Construir la transacción: primero patch para unset, luego deletes
    let tx = adminClient.transaction();

    // unset subscriber en todas las subscriptions encontradas
    for (const subId of subscriptionIds) {
      tx = tx.patch(subId, { unset: ['subscriber'] });
    }

    // borrar las subscriptions
    for (const subId of subscriptionIds) {
      tx = tx.delete(subId);
    }

    // unset currentSubscription en subscribers
    for (const subrId of subscriberIds) {
      tx = tx.patch(subrId, { unset: ['currentSubscription'] });
    }

    // borrar los subscribers
    for (const subrId of subscriberIds) {
      tx = tx.delete(subrId);
    }

    // 4) Commit
    const result = await tx.commit();

    return {
      ok: true,
      message: 'Transacción completada',
      deletedSubscribers: subscriberIds.length,
      deletedSubscriptions: subscriptionIds.length,
      result,
    };
  } catch (err) {
    console.error('Error en deleteByEmail:', err);
    return { ok: false, error: err };
  }
};
