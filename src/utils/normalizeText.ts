export const normalizeText = (text: string) => {
    return text
      .replace(/<[^>]+>/g, '')          
      .normalize("NFD")                 
      .replace(/[\u0300-\u036f]/g, '')  
      .replace(/[^\w\s]/g, '')          
      .trim();
  };
  