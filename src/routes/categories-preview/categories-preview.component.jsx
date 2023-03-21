import { useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import './categories-preview.styles.scss';
import { Fragment } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';


const CategoriesPreview = () =>{
    const {categoriesMap } = useContext(CategoriesContext);
    return (
        // this is another way of using fragment without importing fragment
        <Fragment>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];

                return (
                    <CategoryPreview key={title} title={title} products={products}>

                    </CategoryPreview>
                );

            })}
        </Fragment>
    );


};

export default CategoriesPreview;