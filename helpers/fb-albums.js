import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, push, set, remove } from 'firebase/database';
import { firebaseConfig } from './fb-credentials';

export function initAlbumDB()
{
    initializeApp(firebaseConfig);
}

export function storeAlbumItem(item)
{
    const db = getDatabase();
    const reference = ref(db, 'AlbumData/');
    push(reference, item);
}

export function updateAlbum(item)
{
    const key = item.id;
    delete item.id;
    const db = getDatabase();
    const reference = ref(db, `AlbumData/${key}`);
    set(reference, item);
}

export function deleteAlbum(item)
{
    const db = getDatabase();
    const reference = ref(db, `AlbumData/${item.id}`);
    remove(reference);
}

export function setupAlbumListener(updateFunc)
{
    const db = getDatabase();
    const reference = ref(db, `AlbumData/`);
    onValue(reference, (snapshot) =>
    {
        console.log('Album listener fires up with: ', snapshot);
        if(snapshot?.val())
        {
            const fbObject = snapshot.val();
            const newArr = [];
            Object.keys(fbObject).map((key, index) =>
            {
                console.log(key, '||', index, '||', fbObject[key]);
                newArr.push({...fbObject[key], id:key});
            });
            updateFunc(newArr);
        }
        else
        {
            updateFunc([]);
        }
    });
}