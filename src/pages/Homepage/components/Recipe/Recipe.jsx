/* eslint-disable react/prop-types */
import { useContext } from 'react';
import styles from './Recipe.module.scss';
import { ApiContext } from '../../../../context/ApiContext';

// Permet de déconstruire l'objet recipe une 2eme fois
function Recipe({ recipe: {_id, title, image, liked}, toggleLikedRecipe, deleteRecipe }){

    const BASE_URL_API = useContext(ApiContext);

    async function handleClickLike(){
        try {
            const response = await fetch(`${BASE_URL_API}/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    liked: !liked
                })
            })
            if (response.ok) {
                const updatedRecipe = await response.json();
                toggleLikedRecipe(updatedRecipe);
            }
        } catch (error) {
            console.log('Error');
        }
    }

    async function handleClickDelete(event){
        event.stopPropagation();
        try {
            const response = await fetch(`${BASE_URL_API}/${_id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                deleteRecipe(_id);
            }
        } catch (error) {
            console.log('Erreur', error);
        }
    }

    return (
        <>
        <div onClick={ handleClickLike } className={ styles.recipe }>
            <i onClick={ handleClickDelete } className='fa-solid fa-xmark'></i>
            <div className={ styles.imageContainer }>
                <img src={ image } alt="recette" />
            </div>
            <div className={ `d-flex flex-column justify-content-center align-items-center ${ styles. recipeTitle }`}>
                <h3 className='mb-10'>{ title }</h3>
                <i className={ `fa-solid fa-heart ${ liked ? 'text-primary' : ''}` }></i>
            </div>
        </div>
        </>
    )
}

export default Recipe;