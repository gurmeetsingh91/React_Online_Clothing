import './category.styles.scss'
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { Fragment } from 'react';

const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products,setProducts] = useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);

    },[category, categoriesMap])

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {/* we need to build in a safeguard to only render when products has a value since categoriesMap is a async call */}
            
                {products && 
                    products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                        
                    ))}
            </div>
        </Fragment>

    )

}

export default Category;
