#MVT HOF

This contains the code used for the MVT tests within House of Fraser

General notes:

* Always namespace your css with test name i.e. add a class name (i.e. ux10) to primary element to apply new css and to avoid any css specificity and default css rule clash
* Maximiser doesn't support input elements (ID) as control elements only block level elements (have to reconfirm with official documentation)
* Be patient maximiser web console is slow
* Develop in chrome Dev Tools with local folder mapping to speedup development
* Use base.js file as a starting point for complex tests, this is mini MVC framework to allow you to target specific pages and include custom templates

# Before you write a test
**Base Project can be used as a starting point to create a new test**

### Base Folder
1. Copy and rename the folder to the same name that's on maxymiser
3. Use `npm install -g` to install the dependencies for the grunt (don't forget to git ignore node_modules)
2. Use `Grunt watch` to create a style.css and script.js file in build folder.  
  - these files are created by combining all the js and less/css files found in the src folder for the given file type.  
  - The files in build folders can be mapped in Charles for each working. (more about this in the wiki)  
3. Use `Grunt prod` to create a new minified files.  
  - Use the min files on maxymiser  

### Keep in mind
* CSS files should have a prefix of the current test number and everything should be applied under that parent.
* JS file should add the current test number to the `body` 





#How to test in Maxymiser?
> **Please note**: Sandbox tool has now changed, and Maxymiser has added a new QA tool. Please read the section below for more instructions 

### Maxymiser QA tool (for desktop)
1. Open browser
2. Navigate to www.houseoffraser.co.uk/?mmcore.un=qa  

* The `mmcore.un=qa` tag can be added at the end of any page to display the QA tool.  
* Sandbox and Production can be used to switch the enviorment.
* The edit icon can be used to see the current tests that can be activated on the current page. When a diffrent variant is selected, the tool will refresh the page and show the variant.

### Maxymiser Mobile tool
> These instructions are only for Maxymiser sandbox  

1. Open browser of your choice on mobile device.
2. Log into maxymiser https://hub.maxymiser.com
3. Open http://www.houseoffraser.co.uk?mmcore.pt.enabled=1 in a new Tab.
4. Navigate to the test page
5. You should be able to see Maximiser's Test bar above House of Fraser website header, if you see 'P' (Production) icon in left of that bar click on it to change it to 'S' (Sandbox).
6. Click on 'Preview Tool to select a test and its variations to test them on the page.

> In Case you cant see Maxymiser test bar, then reload the page by changing **m.houseoffraser.co.uk/....** with **www.houseoffraser.co.uk/....** this should load the bar and corrects for this page.

#Test Request Template
* Test Name
* Specifications
    * Measurements
    * Test Targeting
    * Pages to include/exclude
    * Design Direction
* Variations
* Test procedure
    * Test URLs

#Things to Do
* Automated testing to reduce bugs and reduce regression testing effort
