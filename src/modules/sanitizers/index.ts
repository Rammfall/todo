import sanitizeHtml from 'sanitize-html';

import trim from './trim';

const sanitize = (data: string, skipHtmlSanitize: boolean = false): string => {
  let result: string = trim(data);

  result = skipHtmlSanitize ? sanitizeHtml(result) : result;

  return result;
};

export default sanitize;
