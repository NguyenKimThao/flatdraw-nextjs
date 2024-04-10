import { v1 as uuidv1 } from 'uuid';

export default function generateUniqueId(): string {
  return uuidv1();
}
