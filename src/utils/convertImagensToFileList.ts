export const convertImagensToFileList = (imagens: any[]) => {
  return imagens.map((img) => ({
    uid: img.id,
    name: img.imagem.split('/').pop(), // nome do arquivo
    status: 'done',
    url: img.imagem,
  }));
};