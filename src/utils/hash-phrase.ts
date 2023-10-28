import { hash, compare } from 'bcrypt';

export const createHash = async (phrase: string): Promise<string> => {
   const saltRounds = 10;
   return hash(phrase, saltRounds);
};

export const validateHash = async (
   phrase: string,
   phrasedHashed: string,
): Promise<boolean> => {
   return compare(phrase, phrasedHashed);
};
