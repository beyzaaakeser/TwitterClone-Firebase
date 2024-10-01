import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '.';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';

const uploadToStorage = async (file) => {
  if (!file || !file.type.startsWith('image')) return null;

  if (file.size > 2097153)
    return toast.warning('Lütfen 2 MB altında medya yükleyin');

  const imageRef = ref(storage, v4() + file.name);

  await uploadBytes(imageRef, file);

  const url = await getDownloadURL(imageRef);
  return url;
};

export default uploadToStorage;
