# Country Picker.JS
![image](https://user-images.githubusercontent.com/79756986/161482162-65c51b56-bc5e-4a2f-bc7b-7e5528220a0c.png)
In my opinion, long lists of countries are boring, So I spiced things up by making a map that acts as a country selector.
[Click Here For Demo](https://samarthcat.github.io/Country-Picker.JS/)

Country Picker.JS is very customizable, you can add your own css and change the map colours.
When a user picks a country, it will return an object that contains the country name, 2 digit ISO code, and the latitude/longitude.

# Installation And Importing
You can import this file from the cdn:
```html
<script src="https://cdn.jsdelivr.net/gh/SamarthCat/Country-Picker.JS@1.0.0/countrypicker.js"></script>
```
Or you can [download the file](https://raw.githubusercontent.com/SamarthCat/Country-Picker.JS/main/countrypicker.js) for offline use.
Everything needed is stored in countrypicker.js, so it will work offline.
[JQuery](https://jquery.com) and [Panzoom](https://github.com/anvaka/panzoom) are dependencies, but they are embedded in the js file via data urls.

# Creating A Basic Picker
It's easy, just create an html element:

```html
<countryinput></countryinput>
```

You'll get an element that closely resembles ``` <input type="file"> ```.

![image](https://user-images.githubusercontent.com/79756986/161484626-42374c6c-313f-424b-b247-a1d18955b527.png)

When you click it, a map will appear, where a user can select a country.

# Getting The Selected Country
It's just as easy to get the selected country from javascript.

Give the element an id:
```html
<countryinput id="myInput"></countryinput>
```

Then, grab the ``` value ``` of the element from javascript:
```javascript
alert(document.getElementById("myInput").value.Name);
```

Note that the ``` value ``` will be undefined if no country has been selected. This can easily be fixed by getting the value in the ``` oninput ``` event:
```html
<countryinput oninput="alert(this.value.Name);"></countryinput>
```

# Other Events

The ``` onchange ``` event is exactly the same as the ``` oninput ``` event.

The ``` onload ``` event fires when the map is opened.

The ``` onclose ``` event fires when the map is closed or when the user selects a country.

# Value Object

The ``` element.value ``` object in ``` <countryinput> ``` tags is not a string.
If you want the name of the country you need to make sure you get ``` element.value.Name ```.

The object also has other properties:
```javascript

{
  Name: string, //The name of the country, EG: United Kingdom
  Code: string, //The 2-digit ISO country code, EG: UK
  Coordinates: {
    lat: float, //Latitude
    long: float //Longitude
  }
}

```

# Styling The Input

Internally, the ``` <countryinput> ``` element is made up of a ``` <button> ``` and a ``` <label> ```, so you can apply styles to those:

```css

countryinput {
    display: flex;
    align-items: center;
    justify-content: center;
}
countryinput label, countryinput button {
    color: rgb(158, 158, 158);
    font-family: "Montserrat";
    margin-left: 10px;
}
countryinput button {
    transition: 0.3s;
    color: white;
    background-color: rgba(0, 0, 0, 0.452);
    width: 100px;
    border: none;
    border-radius: 5px;
}

```
![image](https://user-images.githubusercontent.com/79756986/161695925-cd07b758-7db7-440f-9c43-1f57f07c67be.png)

