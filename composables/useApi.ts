import { ref } from 'vue'
import axios from 'axios'
import type { MusicResponse, Music, MusicCreatePayload, MusicUpdatePayload, StrapiError } from '~/types/music'

export const useApi = () => {
  const config = useRuntimeConfig()
  const loading = ref(false)
  const error = ref<StrapiError | null>(null)

  const api = axios.create({
    baseURL: `${config.public.apiBase}/api`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  const fetchMusic = async (
    page: number = 1,
    pageSize: number = 10,
    sort: string = 'createdAt:desc'
  ): Promise<MusicResponse | null> => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/musics', {
        params: {
          'populate[coverImage][fields][1]': 'url'
        }
      })
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.error || {
        status: 500,
        name: 'Error',
        message: 'An error occurred while fetching music data',
        details: err
      }
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchMusicById = async (documentId: string): Promise<Music | null> => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get(`/musics/${documentId}`, {
        params: {
          'populate[coverImage][fields][1]': 'url'
        }
      })
      return response.data?.data
    } catch (err: any) {
      error.value = err.response?.data?.error || {
        status: 500,
        name: 'Error',
        message: 'An error occurred while fetching music data',
        details: err
      }
      return null
    } finally {
      loading.value = false
    }
  }

  const createMusic = async (musicData: MusicCreatePayload): Promise<Music | null> => {
    const loading = ref(true)
    const error = ref(null)

    try {
      // 1. Créer la musique sans médias
      const { coverImage, ...fields } = musicData

      const createRes = await api.post('/musics', {
        data: { ...fields },
      })

      const musicId = createRes.data?.data?.id
      if (!musicId) throw new Error("Music creation failed")

      // 2. Upload Cover Image
      if (coverImage) {
        console.log('Uploading cover image:', coverImage)
        const coverImageBuffer = await coverImage.arrayBuffer()
        const formData = new FormData()
        formData.append('files', new Blob([coverImageBuffer], { type: coverImage.type }), coverImage.name)
        formData.append('ref', 'api::music.music') // UID du model
        formData.append('refId', musicId.toString())
        formData.append('field', 'coverImage') // nom du champ dans le model

        await api.post('/upload', formData)
      }

      return createRes.data?.data

      // 3. Upload Music File
      // if (musicFile) {
      //   const formData = new FormData()
      //   formData.append('files', musicFile)
      //   formData.append('ref', 'api::music.music')
      //   formData.append('refId', musicId.toString())
      //   formData.append('field', 'music_url') // nom du champ dans le model

      //   await api.post('/upload', formData)
      // }

      // 4. Re-fetch musique complète (avec populate)
      // const finalRes = await api.get(`/musics/${musicId}?populate=*`)
      // return finalRes.data?.data
    } catch (err: any) {
      console.error(err)
      error.value = err.response?.data?.error || {
        status: 500,
        name: 'Error',
        message: 'An error occurred while creating the music entry',
        details: err,
      }
      return null
    } finally {
      loading.value = false
    }
  }


  const updateMusic = async (documentId: number, musicData: MusicUpdatePayload): Promise<Music | null> => {
    const loading = ref(true);
    const error = ref(null);

    try {
      const { coverImage, ...fields } = musicData;

      // 1. Mettre à jour les champs textuels
      const updateRes = await api.put(`/musics/${documentId}`, {
        data: { ...fields },
      });

      if (!updateRes.data?.data) throw new Error("Music update failed");

      const musicId = updateRes.data?.data?.id;
      if (!musicId) throw new Error("Music ID not found");

      // 2. Upload nouvelle coverImage si fournie
      if (coverImage) {
        const coverImageBuffer = await coverImage.arrayBuffer();
        const formData = new FormData();
        formData.append('files', new Blob([coverImageBuffer], { type: coverImage.type }), coverImage.name);
        formData.append('ref', 'api::music.music');
        formData.append('refId', musicId.toString());
        formData.append('field', 'coverImage');

        await api.post('/upload', formData);
      }


      // 3. Retourner la version à jour (tu peux ajouter ?populate=* si besoin)
      // const finalRes = await api.get(`/musics/${documentId}?populate=*`);
      // return finalRes.data?.data;
      return updateRes.data?.data;
    } catch (err: any) {
      console.error(err);
      error.value = err.response?.data?.error || {
        status: 500,
        name: 'Error',
        message: 'An error occurred while updating the music entry',
        details: err,
      };
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteMusic = async (documentId: number): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      await api.delete(`/musics/${documentId}`)
      return true
    } catch (err: any) {
      error.value = err.response?.data?.error || {
        status: 500,
        name: 'Error',
        message: 'An error occurred while deleting music entry',
        details: err
      }
      return false
    } finally {
      loading.value = false
    }
  }


  return {
    loading,
    error,
    fetchMusic,
    fetchMusicById,
    createMusic,
    updateMusic,
    deleteMusic
  }
}