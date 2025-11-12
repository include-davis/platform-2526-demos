'use client'
import { getCats } from '@/app/(util)/getCats';
import { useState, useEffect } from 'react'
import styles from './page.module.scss'
import { addCat } from '@/app/(util)/addCat';

interface Cat {
    _id: string;
    name: string;
    fur: string;
}

export default function CatsDisplay() {
    const [cats, setCats] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [furInput, setFurInput] = useState('');

    const populateCats = async() => {
        const catsData = await getCats();
        setCats(catsData);
    }

    useEffect(() => {
        populateCats();
    }, []);

    return(
        <div className={styles.catDisplay}>
            <h1>Cats</h1>
            <div>
                {
                    cats.map((cat: Cat) =>
                        <div key={cat._id} className={styles.catCard}>
                            <p>{cat.name}</p>
                            <p>{cat.fur}</p>
                        </div>
                    )
                }
            </div>
            <div>
                <p>Name</p>
                <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />
                <p>Fur</p>
                <input
                    value={furInput}
                    onChange={(e) => setFurInput(e.target.value)}
                />
                <button
                    onClick={async () => {
                        await addCat(nameInput, furInput);
                        populateCats();
                    }}
                >Add Cat!</button>
            </div>
        </div>
    );
}