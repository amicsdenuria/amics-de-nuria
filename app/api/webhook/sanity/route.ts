import { NextResponse } from 'next/server';
import { deleteasdf } from '@/actions/delete';

export const GET = async () => {
  try {
    console.log('[delete] Iniciando deleteasdf...');
    const result = await deleteasdf();

    // Si tu función devuelve un objeto del estilo { ok: false, error: ... }
    if (
      result &&
      typeof result === 'object' &&
      'ok' in result &&
      result.ok === false
    ) {
      console.error(
        '[delete] deleteasdf devolvió error:',
        result.error ?? result,
      );
      return new NextResponse('Failed', { status: 500 });
    }

    console.log('[delete] Finalizado OK. Resultado:', result);
    return new NextResponse('Deleted', { status: 200 });
  } catch (err: unknown) {
    // Logging robusto del error
    if (err instanceof Error) {
      console.error('[delete] Error no esperado:', {
        message: err.message,
        stack: err.stack,
      });
    } else {
      console.error('[delete] Error no esperado (no Error):', err);
    }

    // opcional: si quieres devolver más info en desarrollo podrías serializar algo aquí,
    // pero por seguridad en producción es mejor no exponer detalles de errores en la respuesta.
    return new NextResponse('Failed', { status: 500 });
  }
};
