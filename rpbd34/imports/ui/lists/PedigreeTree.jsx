import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles.css';

const PedigreeTree = ({ animal, animals, depth = 0  }) => {

    const [renderedAnimals, setRenderedAnimals] = useState(new Set());

    const renderParents = (animal) => {

            if (!animal /*|| renderedAnimals.has(animal._id)*/) {
              return;
            }
        
            // Mark the animal as rendered
            //setRenderedAnimals(renderedAnimals.add(animal._id));
        
            const mother = animals.find(a => a._id === animal.mother?._id);
            const father = animals.find(a => a._id === animal.father?._id);
        
            console.log('mother: ', mother, 'father:', father);
        
            return (
                <div style={{ marginLeft: `${depth * 20}px` }}>
                {mother && ( 
                  <div>
                    <p>Mother: {mother.name}</p>
                    {mother && (
                        <PedigreeTree animal={mother} animals={animals} depth={depth + 1}/>
                        
                    )} 
                    {/* ----{mother.name}---- */}
                  </div>
                )}
                {father && (
                  <div>
                    <p>Father: {father.name}</p>
                    {father && (
                        <PedigreeTree animal={father} animals={animals} depth={depth + 1}/>
                        
                    )}
                    {/* ----{father.name}---- */}
                  </div>
                )}
                
              </div>
              
            );
    };

        return renderParents(animal);

};

export default PedigreeTree;