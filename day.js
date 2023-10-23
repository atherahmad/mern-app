// Task: Create a function that will accept two dates one as the starting date and other as ending date
// The function must return number of days between those two Date.

// Steps Involved
//  Defined a function name daysCalculator that will return the total number of days between two dates.

// There  will be three major steps of this task
    // 1- Converting the Date string into Month , Day and Year and converting the strings into digits. Done with dateTypeConvertor function.
    // 2- Checking the number of days spent between starting and ending Year (startingYear's and endingYear's days will not be calculated here). 
            // Done with middleYearsHandler function
    // 3- Checking How many days spent in startingYear. Done with the daysSpentInStartingYear
            //  but is very much similar to daysSpentInEndingYear function but at end subtracting the days from 365 or 366
    // 4- Checking How many days spent in endingYear. Done with daysSpentInEndingYear function.

    function daysCalculator(startingDate, endingDate){

        const startingDateObject = dateTypeConvertor(startingDate)
        const endingDateObject =  dateTypeConvertor(endingDate)
    
        // Calculating days for the years coming between starting and ending date(Year only)
        const betweenYearsDays = middleYearsHandler(startingDateObject.year, endingDateObject.year)
    
    
        // Are  both dates are of Same year?
        // Because in same year case we want to set startingYearDays differently
        const sameYear = (startingDateObject.year === endingDateObject.year)
      
        const startingYearDays =  sameYear? spentDaysLoopHandler(startingDateObject) :  daysSpentInStartingYear(startingDateObject)
    
        const endingYearDays = daysSpentInEndingYear(endingDateObject)
    
        // Again we will check same year & according to that will calculate the total Days.
    
        const totalDays = sameYear ? 
                        endingYearDays - startingYearDays
                        : startingYearDays + betweenYearsDays + endingYearDays
    
        console.log('total days according to  our function ', totalDays)
    
        // It is just to verify our result with javascript in build Date object and its methods
        const totalDaysWithJS = 
            (new Date(`${endingDateObject.month}/${endingDateObject.day}/${endingDateObject.year} 00:00:00`)
            - new Date(`${startingDateObject.month}/${startingDateObject.day}/${startingDateObject.year} 00:00:00`))
            / (1000 * 60 * 60 * 24 )
    
        console.log('total days according to  JS BUILT IN DATE OBJECT ', totalDaysWithJS)
    
        return totalDays
    
    }
    
    daysCalculator('12/02/2001', '20/02/2003')
    
    // Step 1:
    
    // dateTypeConvertor function will accept a Date String in the format of 'DD/MM/YYYY' as parameter
    // It will convert the date String into an Object with properties Day, Month and Year with values of number type
    
    function dateTypeConvertor (date){
    
        const dateArray = date.split('/')
    
        // Destructuring the array into Day, Month and Year
        const [day, month, year] = dateArray
    
        // Above line of code can also be achieved with below line of code 
        // const day = dateArray[0] ; month = dateArray[1] ; year = dateArray[2]
    
        return {
            day: parseInt(day),
            month: parseInt(month),
            year: parseInt(year)
        }
    }
    
    // Step 2:
    //  Checking the number of days passed between starting and endingYear (startingYear's and endingYear's days will not be calculated here)
        // e.g. starting year is 2000 and ending year is 2017, in this case we will only calculate the days in the year from 2001 to 2016
        // Secondly we must keep in mind that every year could have 365 or 366 days in total, years that are having 366 days are called Leap Years
        // In every Leap year Month of Feb consists on 29 Days
        // Every year that is divisible by 4 is called a Leap year
        // So we can easily check depending on the year value either it is a Leap year or not by using Modulus ('%') Operator
        // For example 2024 % 4 = 0, that means it is a leap year and 2023 % 4 = 3 so it is not a leap year
    
        // Solution for Step 2:
            // we will develop a function named middleYearsHandler that will accept startingYear and endingYear as parameter
            // This is function will return number of days between these two years
            // In case the both startingDate and endingDate are from the same year or having only 1 year difference (2023, 2024) then we can simply return 0 days from this function
            // Value of parameters must be of type Number
    
        function middleYearsHandler(startingYear, endingYear){
            // First lets check either both year are same or not or their difference is only 1 year
            // If both are same or difference is only 1 we will simply return 0 with our proceeding further
            
            let daysInBetweenYears = 0;
    
            if(startingYear === endingYear || endingYear - startingYear === 1) return daysInBetweenYears
    
            // Above line of code can also be achieved with below code 
    
            // if(endingYear - startingYear <= 1)  return daysInBetweenYears
    
            // As we are using return syntax in the if condition 
            // if this condition is met next lines of code of code will not be executed from this function
            // That is why we don't need to write the else statement here
    
            // Below line of code will be executed only in the case when startingYear and endingYear are having a difference more than 1
    
    
            for(let index = startingYear + 1; index < endingYear ; index ++){
    
                if(index % 4 === 0) daysInBetweenYears += 366
                else daysInBetweenYears += 365
            }
            return daysInBetweenYears
        }
    
    
        // Step 3- Checking How many days spent in startingYear
            // we will develope a function name daysSpentInStartingYear
            // This function will accept an dateObject containing properties and values of day, month and year { day: 12, month: 3, year: 1981 }
            // The values of day, month and year will be of type number
            // This function will return the number of days spent in the year of the startingDate
    
            // Solution Step 3:
                // First Important thing is to check either the starting year is a Leap year or not
                //  Store the day of the date in a variable
                // Then we will check how many days spent in the year excluding the current date's month because its days will be already stored+
                // I have modified the code to avoid repetition of the loop and days calculation for starting and ending dates
    
        function daysSpentInEndingYear  (dateObject){
                const daysSpent = spentDaysLoopHandler(dateObject)
            return daysSpent
        }
    
        function daysSpentInStartingYear (dateObject){
            //We will use the same spentDaysLoopHandler to check how many days passed upto the current provided date
            // Then we wil deduct them from 365 or 366 according to the year
            // Because in Leap year there are 366 days and in normal years there are 365 days
    
                const daysSpent = spentDaysLoopHandler(dateObject)
            return dateObject.year % 4 === 0 ? 366 - daysSpent : 365 - daysSpent
    }
    
        function spentDaysLoopHandler(dateObject){
            // First lets check the day of the and store it in a variable
                const daysSpentInMonth = dateObject.day
    
                let totalDays = daysSpentInMonth
           // So will loop only the months that passed before the active month 
            // e.g. in case of 25/02/2024 is the date passed
                // We will not calculate the days for the 2nd Month in loop because we have already calculated it and stored in daysSpentInMonth variable
                // So will run loop from 1st Month (Jan) to the limit when Month is less than active Month( in our example active month is Feb (2nd Month))
    
    
            for(let index = 1; index < dateObject.month; index ++){
    
                // As we knew very well the seventh month(July) every month who is divisible by 2 is having 30 days except Feb month
                // And from 8th Month (August) every month divisible with 2 is having 31 days
                // We need to check both above conditions before adding days to  the totalDays  for each month
    
                index < 8 ? // Checking either month is below  8 (August)
                    index % 2 === 0 ? // Checking either month is divisible by 2 or not because they will have 30 days except for Feb
                        index === 2 ? //Checking either the month is Feb or not
                            dateObject.year % 4 === 0 ? ///Checking either the ending year is a leap year or not because in leap years Feb has 29 days but for others 28
                                (totalDays += 29) // For leap year
                                : (totalDays += 28) // For non Leap Year
                            : (totalDays += 30) // For Months other than Feb but divisible by 2 (April, June)
                        :(totalDays += 31) // For Months not divisible by 2 (Jan, Mar, May, July)
                    : index % 2 === 0 ? // Checking either month is divisible by 2 or not
                        (totalDays += 31) // For Months starting from August , if divisible by 2 they will have 31 days
                        :(totalDays += 30) // For Months starting from August , if not divisible by 2 they will have 30 days
    
                }
                return totalDays
    
        }
    
