import { IPermissao } from "@/interfaces/IPerfil";

  const agruparPermissoes = (permissoes: IPermissao[]) => {
    const grupos: Record<string, Record<string, IPermissao[]>> = {};

    permissoes.forEach((perm) => {
      const parts = perm.codigo.split('_');
      const group = parts[0] || 'outros';
      const subgroup = parts[1] || 'outros';

      if (!grupos[group]) grupos[group] = {};
      if (!grupos[group][subgroup]) grupos[group][subgroup] = [];

      grupos[group][subgroup].push(perm);
    });

    return grupos;
  };

  export default agruparPermissoes;