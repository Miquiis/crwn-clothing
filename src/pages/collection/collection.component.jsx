import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss'

const CollectionPage = ({ collection }) => (
    <div className='collection-page'>
        <h2 className='title'>{collection.title}</h2>
        <div className='items'>
            {
                collection.items.map(item => <CollectionItem item={item} key={item.id} />)
            }
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);