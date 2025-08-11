export const convertImagensToFileList = (imagens: any[]) => {
  return imagens.map((img) => {
    const imagemPath = typeof img.imagem === 'string' ? img.imagem : '';
    return {
      uid: img.id,
      name: imagemPath.split('/').pop() || 'sem_nome',  // nome do arquivo ou fallback
      status: 'done',
      url: img.imagem_url,
    };
  });
};
