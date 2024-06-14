import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, push, set, remove } from 'firebase/database';
import { firebaseConfig } from './fb-credentials';

export function initAlbumDB()
{
    initializeApp(firebaseConfig);
}

export function storeAlbumItem(user, item)
{
    const db = getDatabase();
    const reference = ref(db, `${user}/AlbumData/`);
    push(reference, item);
}

export function updateAlbum(user, item)
{
    const key = item.id;
    delete item.id;
    const db = getDatabase();
    const reference = ref(db, `${user}/AlbumData/${key}`);
    set(reference, item);
}

export function deleteAlbum(user, item)
{
    const db = getDatabase();
    const reference = ref(db, `${user}/AlbumData/${item.id}`);
    remove(reference);
}

export function setupAlbumListener(user ,updateFunc)
{
    const db = getDatabase();
    const reference = ref(db, `${user}/AlbumData/`);
    console.log('Reference Path:' + reference.toString())
    onValue(reference, (snapshot) =>
    {
        console.log('Album listener fires up with: ', snapshot);
        if(snapshot?.val())
        {
            const fbObject = snapshot.val();
            const newArr = [];
            Object.keys(fbObject).map((key, index) =>
            {
                newArr.push({...fbObject[key], id:key});
            });
            updateFunc(newArr);
        }
        else
        {
            console.log('No album data found')
            updateFunc([]);
        }
    });
}

export function updateProfileInfo(user, data)
{
    const db = getDatabase();
    const reference = ref(db, `${user}/ProfileData`);
    set(reference, data);
}

export function setUpProfileListener(user, updateFunc)
{
    const db = getDatabase();
    const reference = ref(db, `${user}/ProfileData/`);
    console.log('Reference Path:' + reference.toString())
    onValue(reference, (snapshot) =>
    {
        console.log('Profile listener fires up with: ', snapshot);
        if(snapshot?.val())
        {
            const fbObject = snapshot.val();
            updateFunc(fbObject);
        }
        else
        {
            console.log('No album data found')
            updateFunc('');
        }
    });
}