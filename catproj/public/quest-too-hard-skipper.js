function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
//presentepisode is the set of responses given by the examinee
var presentepisode=[];

function startalg(){
    presentepisode.push(isCorrect);
    computewithapp();

}

function tick(value){
    isCorrect=value;
    console.log("Selected",value);
}
var isCorrect;
var noq=0;

function computewithapp(){  
    //executed everytime after a response is given
    noq++;
    if(noq<5){
        var skippedFlag=false;
        if(presentepisode.length>=2){
                if(computeStopper()){
                    console.log("Question which is skipped is -",noq);
                    presentepisode.push(0);
                    noq++;
                    skippedFlag=true;
                    //Conclude that examinee cant answer the next question due to incorrect previous responses
                }
            
            if(!skippedFlag){
                //if algorithm cant predict with certain accuracy that examinee answers next question incorrectly 
                console.log("Question shown to examinee-",noq);
                // presentepisode.push(isCorrect);
                //Show the next question
            }
        }else{
            console.log("Question shown to examinee-",noq);
            // presentepisode.push(isCorrect);
        }
        if(noq<5){
            $('#qno').text(noq+1);
        }
        
    }
    else{
            console.log("End of test");
        // presentepisode.forEach(function(episode,j){
        //         console.log("Need to revise solution for question-",j+1)
        //         $('#revision'+j).val(presentepisode[j]);
        // });
        // $('#resultsform').submit();
    }
    if(noq>5){
            console.log("End of test");
        presentepisode.forEach(function(episode,j){
            console.log("Need to revise solution for question-",j+1)
            $('#revision'+j).val(presentepisode[j]);
        });
        $('#resultsform').submit();
    }
    
    
}
//Driver code to execute the algorithm 
//Input is testepisode
//testepisode is the set of responses by the examinee
//try changing the testepisode for different responses
var testepisode=[1,0,1,0]; compute();

//This is the Output you get when u paste the code in browser console for testepisode=[1,0,1,0]-

// Question shown to examinee- 1 
// Question shown to examinee- 2 
// Question shown to examinee- 3 
// Question which is skipped is - 4 
// Question which is skipped is - 5 
// End of test 
// Need to revise solution for question- 2 
// Need to revise solution for question- 4 
// Need to revise solution for question- 5



//from this line towards the end of file copy and paste the code in browser console
//after pasting the below code execute the above driver code for varying inputs


//dataSet is the total set of previous responses of the students
//each array in dataset is an instance of responses of a student
// 1 corresponds to correct response for a question
// 0 corresponds to incorrect response for a question

// [1,0,0,0,0] corresponds to the fact that student has answered only the first question correctly out of five questions in the test



// Based on the set of responses for the test the questions are ordered in an ascending order of difficulty
//difficulty level of a question is inversely proportional to the no. of correct responses for that question in the dataSet



function compute(){  
    //executed everytime after a response is given
    for(var i=0;i<=testepisode.length && i<dataSet[0].length;i++){
        var skippedFlag=false;
        if(i!=0){
                if(computeStopper()){
                    console.log("Question which is skipped is -",i+1);
                    presentepisode.push(0);
                    skippedFlag=true;
                    //Conclude that examinee cant answer the next question due to incorrect previous responses
                }
            
            if(!skippedFlag){
                //if algorithm cant predict with certain accuracy that examinee answers next question incorrectly 
                console.log("Question shown to examinee-",i+1);
                presentepisode.push(testepisode[i]);
                //Show the next question
            }
        }else{
            console.log("Question shown to examinee-",i+1);
            presentepisode.push(testepisode[i]);
        }
    }
    console.log("End of test");
    presentepisode.forEach(function(episode,j){
        if(episode==0)
        console.log("Need to revise solution for question-",j+1)
    });
    
}



function computeStopper(){

    var dataSet=[
        [1,0,0,0,0],
        [0,1,0,0,0],
        [1,0,1,0,0],
        [0,1,0,1,0],
        [1,1,0,0,0],
        [1,1,1,0,0],
        [1,1,0,1,0],
        [1,1,1,0,1],
        [1,1,0,1,1],
        [1,1,1,1,1],
        [0,0,0,0,0],
        [1,0,0,0,0],
        [0,1,0,0,0],
        [1,0,1,0,0],
        [0,1,0,1,0],
        [1,1,0,0,0],
        [1,1,1,0,0],
        [1,1,0,1,0],
        [1,1,1,0,1],
        [1,1,0,1,1],
        [1,1,1,1,1],
        [0,0,0,0,0],
        [1,0,0,0,0],
        [0,1,0,0,0],
        [1,0,1,0,0],
        [0,1,0,1,0],
        [1,1,0,0,0],
        [1,1,1,0,0],
        [1,1,0,1,0],
        [1,1,1,0,1],
        [1,1,0,1,1],
        [1,1,1,1,1],
        [0,0,0,0,0],
        [1,0,0,0,0],
        [0,1,0,0,0],
        [1,0,1,0,0],
        [0,1,0,1,0],
        [1,1,0,0,0],
        [1,1,1,0,0],
        [1,1,0,1,0],
        [1,1,1,0,1],
        [1,1,0,1,1],
        [1,1,1,1,1],
        [0,0,0,0,0],
        [1,0,0,0,0],
        [0,1,0,0,0],
        [1,0,1,0,0],
        [0,1,0,1,0],
        [1,1,0,0,0],
        [1,1,1,0,0],
        [1,1,0,1,0],
        [1,1,1,0,1],
        [1,1,0,1,1],
        [1,1,1,1,1],
        [0,0,0,0,0],
        
    ];

    var weights=[0,0,0,0,0];
    for(var z=0;z<dataSet[0].length;z++){
        for(var y=0;y<dataSet.length;y++){
            weights[z]+=dataSet[y][z];
        }
        weights[z]=dataSet.length-weights[z];
        $('#weight'+z).val(weights[z]);
    }
    console.log(weights);
    console.log("Determining to skip next question or not!");
    //Returns true if test is to be terminated
    
    var dependentresult,favourabledependentcnt,totaldepenendentcnt=53,result,favourablecnt,totalcnt,totalfraction=0,errorcnt=0;
    var k=0.3,dependencyfactor=0.5;
    //k is the need for correctness of the wrong response factor
    //dependencyfactor is the factor of  dependency of two questions

    for(var i=0;i<presentepisode.length;i++){
        if(presentepisode[i]==0){
            //if a response is wrong
            favourablecnt=0;
            totalcnt=0;
            favourabledependentcnt=0;
            //determining dependency of wrong answer to the next question
            for(var j=0;j<53;j++){
                if(dataSet[j][i]==dataSet[j][presentepisode.length]){
                    favourabledependentcnt++;
                }
            }
            if(totaldepenendentcnt!=0){
                dependentresult=favourabledependentcnt/totaldepenendentcnt;
            }else{
                dependentresult=0;
            }
            //dependentresult is the fraction of dependency of a question to the next question
            
            
            if(dependentresult>=dependencyfactor){
                //if a wrong answer is dependent on the next question
                for(var j=0;j<53;j++){
                    if(dataSet[j][i]==1 && dataSet[j][presentepisode.length]==1){
                        //counting whether a correct response of the answer necessarily implies correct answer of the next question
                        favourablecnt++;
                    }
                    if(dataSet[j][presentepisode.length]==1){
                        //counting the total no. of episodes where a correctresponse is given to the next question
                        totalcnt++;
                    }
                }
                //determing the fraction of need of the wrong answer to be correct for the next answer to be correct
                totalfraction+=favourablecnt/totalcnt;
                errorcnt++;
            }
            
        }
    }
    //Computing average of all the fractions 
    if(errorcnt!=0){
        result=totalfraction/errorcnt;
    }
    else{
        result=0;
    }
        // console.log("result=",1-result);
    if(1-result>k){
        //if average of need fractions is not comparable to the k
        //Do not skip next question
        return false;
    }
    else{
        //if average of need fractions is comparable to the k
        //Skip next question
        return true;
    }
}


//OUTPUTS
//Examinee responses                 should next question be shown?
// [0,0]                             no
// [0,1]                             no
// [1,0]                             yes
// [1,1]                             yes

// [0,0,0]                           no
// [0,0,1]                           no
// [1,1,0]                           yes
// [0,1,1]                           yes
// [1,1,1]                           yes

// [1,1,0,1]                         yes
// [1,1,1,0]                         yes
// [0,1,0,1]                         no


//Output analysis-

//"should the next question be shown" is NO if and only if with certain accuracy 
//the algorithm is able to predict that the answer to the next question is certainly
// going to be incorrect