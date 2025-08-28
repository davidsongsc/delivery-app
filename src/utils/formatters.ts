import { IProduto } from "@/interfaces/IProduto";

/**
 * Formata um valor de data/hora para o formato brasileiro.
 * @param value O valor da data/hora.
 * @returns A data formatada.
 */
function formatDate(value: string) {
    try {
        const d = new Date(value);
        return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
        return value;
    }
}

/**
 * Compara as flags de um produto e retorna um resumo das alterações.
 * @param oldFlags As flags antigas do produto.
 * @param newFlags As novas flags do produto.
 * @returns Uma string com as alterações, ou null se não houver mudanças.
 */
export function formatFlags(oldFlags: Record<string, boolean>, newFlags: Record<string, boolean>): string | null {
    const diffs: string[] = [];
    for (const key in { ...oldFlags, ...newFlags }) {
        const oldVal = oldFlags[key] ?? false;
        const newVal = newFlags[key] ?? false;
        if (oldVal !== newVal) {
            diffs.push(`${key}: ${oldVal ? 'Sim' : 'Não'} → ${newVal ? 'Sim' : 'Não'}`);
        }
    }
    return diffs.length ? diffs.join('\n') : null;
}

/**
 * Compara dois objetos de produto e retorna um resumo detalhado das alterações.
 * @param oldData Os dados originais do produto.
 * @param newData Os novos dados do produto.
 * @returns Uma string com todas as alterações detectadas.
 */
export function compareChanges(oldData: Partial<IProduto>, newData: Partial<IProduto>): string {
    const changes: string[] = [];
    for (const key in newData) {
        if (key === 'imagens') continue;
        const oldVal = (oldData as any)[key];
        const newVal = (newData as any)[key];

        if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
            if (key === 'updated_at' && typeof oldVal === 'string' && typeof newVal === 'string') {
                changes.push(`Atualizado em: ${formatDate(oldVal)} → ${formatDate(newVal)}`);
            } else if (key === 'flags' && typeof oldVal === 'object' && typeof newVal === 'object') {
                const flagsDiff = formatFlags(oldVal as Record<string, boolean>, newVal as Record<string, boolean>);
                if (flagsDiff) changes.push(`Flags:\n${flagsDiff}`);
            } else {
                changes.push(`${key}: ${JSON.stringify(oldVal)} → ${JSON.stringify(newVal)}`);
            }
        }
    }
    return changes.length > 0 ? changes.join('\n') : 'Nenhuma alteração detectada.';
}