/**
 * Created by onkars on 26-02-2018.
 */

function hideMe() {
    $('.right-pull-in').width(0);
    $('.related-trans').first().empty();
}


function toggleView(state,groupFlag){
    if(state!=undefined)
        app.state = state;
    else if(app.state=='')
        app.state = 'regular';
    var grouping = $('.grouping')[0];
    var regular = $('.regular')[0];
    if(state==undefined){
        if(groupFlag=="priority" && app.grouping=="")
        {
            app.grouping="priority";
            $('#grouping').attr('selected','');

        }
        else if(app.grouping=='priority')
        {
            app.grouping="";
            $('#grouping').removeAttr('selected');
        }

        if(app.state.toLowerCase()=='run')
            displayRunning();
        if(app.state.toLowerCase()=='wait')
            displayWaiting();
        if(app.state.toLowerCase()=='ready')
            displayReady();
        if(app.state.toLowerCase()=='fail')
            displayFailed();
        if(app.state.toLowerCase()=='regular')
            populateList();
        return;
    }

    if(state=='regular')
    {
        $('#left-side-area').empty();
        $('#center-side-area').empty();
        $('#middle-side-area').empty();
        $('#right-side-area').empty();

        grouping.style.display='none';
        regular.style.display='flex';
        hidePortion('#left-side-area-outer');
        hidePortion('#center-side-area-outer');
        hidePortion('#middle-side-area-outer');
        hidePortion('#right-side-area-outer');
        $('#running').removeAttr('selected');
        $('#waiting').removeAttr('selected');
        $('#ready').removeAttr('selected');
        $('#failed').removeAttr('selected');

        populateList();
    }
    else{
        grouping.style.display='flex';
        regular.style.display='none';

        if(state.toLowerCase()=='run') {
            if($('#left-side-area-outer')[0].style.display=='flex') {
                hidePortion('#left-side-area-outer');
                $('#running').removeAttr('selected');
            }
            else {
                displayRunning();

                //for single display only
                hidePortion('#center-side-area-outer');
                $('#waiting').removeAttr('selected');

                hidePortion('#middle-side-area-outer');
                $('#ready').removeAttr('selected');

                hidePortion('#right-side-area-outer');
                $('#failed').removeAttr('selected');
            }
        }
        else{
            if($('#left-side-area-outer')[0].style.display=='none')
                $('#left-side-area-outer').removeAttr('flex');
        }
        if(state.toLowerCase()=='wait') {
            if($('#center-side-area-outer')[0].style.display=='flex') {
                hidePortion('#center-side-area-outer');
                $('#waiting').removeAttr('selected');
            }
            else {
                displayWaiting();

                //for single display only
                hidePortion('#left-side-area-outer');
                $('#running').removeAttr('selected');

                hidePortion('#middle-side-area-outer');
                $('#ready').removeAttr('selected');

                hidePortion('#right-side-area-outer');
                $('#failed').removeAttr('selected');

            }
        }
        else {
            if($('#center-side-area-outer')[0].style.display=='none')
                $('#center-side-area-outer').removeAttr('flex');
        }

        if(state.toLowerCase()=='ready') {
            if($('#middle-side-area-outer')[0].style.display=='flex') {
                hidePortion('#middle-side-area-outer');
                $('#ready').removeAttr('selected');
            }
            else {
                displayReady();

                //for single display only
                hidePortion('#left-side-area-outer');
                $('#running').removeAttr('selected');

                hidePortion('#center-side-area-outer');
                $('#waiting').removeAttr('selected');

                hidePortion('#right-side-area-outer');
                $('#failed').removeAttr('selected');

            }
        }
        else {
            if($('#middle-side-area-outer')[0].style.display=='none')
                $('#middle-side-area-outer').removeAttr('flex');
        }

        if(state.toLowerCase()=='fail') {
            if ($('#right-side-area-outer')[0].style.display == 'flex') {
                hidePortion('#right-side-area-outer');
                $('#failed').removeAttr('selected');
            }
            else {
                displayFailed();

                //for single display only
                hidePortion('#left-side-area-outer');
                $('#running').removeAttr('selected');

                hidePortion('#middle-side-area-outer');
                $('#ready').removeAttr('selected');

                hidePortion('#center-side-area-outer');
                $('#waiting').removeAttr('selected');

            }
        }
        else {
            if($('#right-side-area-outer')[0].style.display=='none')
                $('#right-side-area-outer').removeAttr('flex');
        }

        if($('#left-side-area-outer')[0].style.display=='none' && $('#center-side-area-outer')[0].style.display=='none' &&  $('#middle-side-area-outer')[0].style.display=='none' && $('#right-side-area-outer')[0].style.display=='none') {
           toggleView('regular');
        }
    }

    function hidePortion(area) {
        $(area)[0].style.display = 'none';
        $(area).removeAttr('flex');
    }



    function displayRunning() {
        $('#running').attr('selected','');
        $('#left-side-area').empty();
        $('#left-side-area-outer')[0].style.display='flex';
        $('#left-side-area-outer').attr('flex','');

        var data = new app.TransactionModelList(modelList.where({status: 'Running'}));
        if(app.grouping=='priority')
            data = data.groupBy( function(model){
                return model.get('priority');
            });
        var group1 = new app.ListView({model:data});
        $('#left-side-area').append(group1.render().el);
    }

    function displayWaiting() {
        $('#waiting').attr('selected','');
        $('#center-side-area').empty();
        $('#center-side-area-outer')[0].style.display='flex';
        $('#center-side-area-outer').attr('flex','');

        var data = new app.TransactionModelList(modelList.where({status: 'Waiting'}));
        if(app.grouping=='priority')
            data = data.groupBy( function(model){
                return model.get('priority');
            });
        var listView = new app.ListView({model: data});
        $('#center-side-area').append(listView.render().el);
    }

    function displayReady() {
        $('#ready').attr('selected','');
        $('#middle-side-area').empty();
        $('#middle-side-area-outer')[0].style.display='flex';
        $('#middle-side-area-outer').attr('flex','');
        var data = new app.TransactionModelList(modelList.where({status: 'Ready'}));
        if(app.grouping=='priority')
            data = data.groupBy( function(model){
                return model.get('priority');
            });

        var listView = new app.ListView({model: data});
        $('#middle-side-area').append(listView.render().el);
    }

    function displayFailed() {
        $('#failed').attr('selected','');
        $('#right-side-area').empty();
        $('#right-side-area-outer')[0].style.display='flex';
        $('#right-side-area-outer').attr('flex','');
        var data = new app.TransactionModelList(modelList.where({status: 'Failed'}));
        if(app.grouping=='priority') {
            data = data.groupBy(function (model) {
                return model.get('priority');
            });
        }
        var listView = new app.ListView({model: data});
        $('#right-side-area').append(listView.render().el);
    }

}

var app = {};
app.grouping="";
app.state="";

app.TransactionModel = Backbone.Model.extend({
    defaults:{
        conversationId : '12345-87546-asasas-878478',
        processName:'Process Name',
        trnId:'1234-asdf-5678-qwer',
        startDate:'25/01/2018 12.00',
        endDate:'25/01/2018 12.01',
        runTime:1,
        status:'Success',
        priority:'LOW',
        selected:'',
        showMore:false
    }
});

app.TransactionModelList = Backbone.Collection.extend({
    model:app.TransactionModel
});

app.CardView = Backbone.View.extend({
    template: _.template($('#card-template').html()),
    render: function(){
        this.setElement(this.template(this.model.toJSON()));
        return this; // enable chained calls
    },
    selectMe : function(modelData){
        modelData.selected="selected"
    },


    initialize: function(){
    }
});

app.MiniCardView = Backbone.View.extend({
    template: _.template($('#mini-card-template').html()),
    className:'card-container-wrapper',
    render: function(){

        if(this.model instanceof app.TransactionModelList) {
            this.data = this.model.models;
            this.$el.append(this.template(this.data));
        }
        else
            for (var key in this.model) {
                this.data = this.model[key];
                // this.dataTitle = key;
                this.$el.append(this.template(this.data))
            }
        return this; // enable chained calls
    },
    initialize: function(){
    }
});

app.ListItemView = Backbone.View.extend({
    model:app.TransactionModel,
    render:function () {

    },
    initialize : function () {

    },
    events:{
        'click .list-container':function (event) {
            var eventData = $(event.currentTarget);
            var key = (eventData.data('cid'));
            console.log(this.data,eventData.data('modelData'));

        },
        'click .show-more' : function (event) {

            if($('.right-pull-in').first().width()==0)
                $('.right-pull-in').width("360px");
            else
            {
                hideMe();
                return;
            }

            var eventData = $(event.currentTarget);
            var key = (eventData.data('cid'));


            var aaa = new app.TransactionModelList(modelList.where({conversationId: 'aaaaa-87546-asasas-878478'}));
            console.log(aaa);


            $('.related-trans').first().empty().append(new app.MiniCardView({model: aaa}).render().el);

            // console.log(JSON.stringify(eventData.data('modelData')))

            eventData.data('modelData').selected=true;
        },
        'click .list-info' :function (event) {
            event.stopImmediatePropagation();
            if($('.right-pull-in').first().width()==0)
                $('.right-pull-in').width("360px");
            else
                $('.right-pull-in').width(0);
        }
    }
});

app.ListView = Backbone.View.extend({
    collection:app.TransactionModelList,
    template: _.template($('#list-template').html()),
    className:'list-container-wrapper',
       render: function(){
         if(this.model instanceof app.TransactionModelList) {
             this.data = this.model.models;
             this.$el.append(this.template(this.data));
         }
         else
        for (var key in this.model) {
            this.data = this.model[key];
            this.dataTitle = key;
            this.$el.append(this.template(this.data))
        }

        return this; // enable chained calls
    },
    initialize: function(){
    }
});

var modelList = new app.TransactionModelList([
    {conversationId:'aaaaa-87546-asasas-878478',processName:"MI Process 1",trnId:'9876-uyty-4587-cvbn',status:"Running",priority:"HIGH"},
    {conversationId:'23455-87546-asasas-878478',processName:"MI Process 2",trnId:'9898-asdf-4587-cvbn',status:"Completed",priority:"NORMAL"},
    {conversationId:'bbbbb-344565-asasas-878478',processName:"MI Process 3",trnId:'9876-uyty-4587-cvbn',status:"Waiting",priority:"LOW"},
    {conversationId:'zzzzz-87546-asasas-878478',processName:"MI Process 4",trnId:'6352-asdf-6565-cvbn',status:"Running",priority:"HIGH"},
    {conversationId:'aaaaa-87546-asasas-878478',processName:"MI Process 5",trnId:'9876-asdf-4587-cvbn',status:"Failed",priority:"NORMAL"},
    {conversationId:'aaaaa-87546-asasas-878478',processName:"MI Process 6",trnId:'1254-asdf-4587-cvbn',status:"Running",priority:"NORMAL"},
    {conversationId:'aaaaa-87546-asasas-878478',processName:"MI Process 7",trnId:'9876-asdf-8569-cvbn',status:"Running",priority:"HIGH"},
    {conversationId:'ggggg-87546-asasas-878478',processName:"MI Process 8",trnId:'9876-asdf-4587-cvbn',status:"Running",priority:"NORMAL"},
    {conversationId:'ggggg-87546-asasas-878478',processName:"MI Process 9",trnId:'7845-usdf-4587-cvbn',status:"Completed",priority:"NORMAL"},
    {conversationId:'rrrrr-87546-asasas-878478',processName:"MI Process 10",trnId:'9876-asdf-4587-cvbn',status:"Running",priority:"LOW"},
    {conversationId:'jjjjj-87546-asasas-878478',processName:"MI Process 11",trnId:'9876-asdf-4587-cvbn',status:"Waiting",priority:"NORMAL"},
    {conversationId:'ppppp-87546-asasas-878478',processName:"MI Process 12",trnId:'2525-asdf-4587-cvbn',status:"Running",priority:"HIGH"},
    {conversationId:'ddddd-87546-asasas-878478',processName:"MI Process 13",trnId:'9876-asdf-1201-cvbn',status:"Failed",priority:"NORMAL"},
    {conversationId:'rrrrr-87546-asasas-878478',processName:"MI Process 14",trnId:'7854-uyty-4587-cvbn',status:"Running",priority:"HIGH"},
    {conversationId:'bbbbb-87546-asasas-878478',processName:"MI Process 15",trnId:'9876-asdf-4587-cvbn',status:"Waiting",priority:"NORMAL"},
    {conversationId:'bbbbb-87546-asasas-878478',processName:"MI Process 16",trnId:'4563-asdf-3258-cvbn',status:"Completed",priority:"LOW"},
    {conversationId:'aaaaa-87546-asasas-878478',processName:"MI Process 17",trnId:'4563-asdf-3258-cvbn',status:"Ready",priority:"LOW"}
]);

     // var cardView = new app.CardView({model:modelList});
function populateList() {
    var list = modelList;
    if(app.grouping=='priority')
        list = modelList.groupBy( function(model){
            return model.get('priority');
        });

    var listView = new app.ListView({model: list});
    $('#regular').empty().append(listView.render().el);
}

populateList();
