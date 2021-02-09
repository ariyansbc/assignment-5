//declaring variable

const searchInput = document.getElementById("search-input");
const errorArea = document.getElementById("error-area");
const detailsArea = document.getElementById("details-area");
const resultArea = document.getElementById("result-area");

const getMeals = () => {

    const inputText = searchInput.value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)
        .then(res => res.json())
        .then(data => {

            let mealHTML = '';
            let wrongInputHTML = "";
            if (inputText === "") {
                let errorHTML = ''; //created variable with empty string for error html content
                errorHTML += `
               <h3>PLease! type something</h3>
               <button onclick="closeBtn()"><i class="fas fa-times"></i></button>
            `
                errorArea.innerHTML = errorHTML;
                errorArea.style.display = "block"
                resultArea.innerHTML = '';

            } else if (data.meals) {
                data.meals.forEach(items => {
                    mealHTML += `
                <div class="meal-items" onclick="itemDetails('${items.strMeal}')">
                    <img src="${items.strMealThumb}" alt="">
                    <h3>${items.strMeal}</h3>
                </div>`;

                });
                resultArea.innerHTML = mealHTML
                // console.log(data.meals);
            } else {
                wrongInputHTML += `
              <h3>Sorry! this Items Not available</h3>
              <button onclick="closeBtn()"><i class="fas fa-times"></i></button>

            `;
                errorArea.innerHTML = wrongInputHTML;
                errorArea.style.display = "block"
                resultArea.innerHTML = '';

            }
        })

    searchInput.value = "";
}
const itemDetails = itemDetail => {
    // console.log(itemDetail);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${itemDetail}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {

            let detailsHTML = "";
            const dataMeals = data.meals[0];

            detailsHTML += `
             <div id="details-wrapper">
                 <div> 
                     <img src="${dataMeals.strMealThumb}" alt="">
                 </div>
                 <h3>${dataMeals.strMeal}</h3>
                 <ul> 
                    <li>${dataMeals.strMeasure1} ${dataMeals.strIngredient1}</li>
                    <li>${dataMeals.strMeasure2} ${dataMeals.strIngredient2}</li>
                    <li>${dataMeals.strMeasure3} ${dataMeals.strIngredient3}</li>
                    <li>${dataMeals.strMeasure4} ${dataMeals.strIngredient4}</li>
                    <li>${dataMeals.strMeasure5} ${dataMeals.strIngredient5}</li>
                    <li>${dataMeals.strMeasure6} ${dataMeals.strIngredient6}</li> 
                    <li>${dataMeals.strMeasure7} ${dataMeals.strIngredient7}</li> 
                 </ul>
                 <button onclick="closeBtn()"><i class="fas fa-times"></i></button>
              </div>
                `;
            detailsArea.innerHTML = detailsHTML
            // console.log(data.meals[0]);
            // console.log(data.meals[0].strIngredient1);
            // console.log(data.meals[0].strIngredient2);
            // console.log(data.meals[0].strIngredient3);
            // console.log(data.meals[0].strIngredient4);
            // console.log(data.meals[0].strIngredient5);
            // console.log(data.meals[0].strIngredient6);
        })
}
const closeBtn = () => {
    errorArea.style.display = "none"
    document.getElementById("details-wrapper").style.display= "none"
}