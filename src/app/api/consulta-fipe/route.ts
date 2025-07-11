export const dynamic = 'force-dynamic'; // (opcional para forçar SSR)

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { codigoFipe } = body;

    if (!codigoFipe) {
      return new Response(
        JSON.stringify({ error: 'Código FIPE não fornecido' }),
        { status: 400 }
      );
    }

    const res = await fetch(`https://brasilapi.com.br/api/fipe/preco/v1/${codigoFipe}`);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Veículo não encontrado' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ sucesso: true, veiculo: data[0] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro ao consultar FIPE:', error);
    return new Response(
      JSON.stringify({ error: 'Erro ao consultar a tabela FIPE' }),
      { status: 500 }
    );
  }
}
