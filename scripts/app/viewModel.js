define(['knockout', 'jquery', 'flickrapi'], function(ko, $) {
    return function viewModel(api) {
        window.flickr = new window.Flickr({
          api_key: api
        });

        this.author = ko.observable("");
        this.displayButtons = ko.observable(false);
        this.radioWay = ko.observable("B");
        this.albums = ko.observableArray([]);

        // this.albumsPerPage = ko.observable(10);

        this.getPhotos = function () {
            self = this;
            if ((self.author() != "")){
                if (self.radioWay() === "B"){
                    self.displayButtons(true);
                    // var albumsPerPage = this.albumsPerPage;
                    window.flickr.people.findByUsername({
                        username: self.author()
                    }, function(errU, result) {
                      if(errU) { alert(errU); return; }
                        window.flickr.photosets.getList({
                          user_id: result.user.id
                        }, function(errS, result) {
                          if(errS) { alert(errS); return; }
                            //add attr for visibility
                            var arr = result.photosets.photoset;
                            $.each(arr, function(i,item) {
                                item['visAlbum'] = ko.observable(false);
                                item['allPhotos'] =  ko.observableArray([]);
                            });
                            self.albums(arr);
                        });
                    });
                }else{
                    self.displayButtons(false);
                }
            }    
            console.log(window.flickr);
        };

        this.showPagination = function (album) {
            // album.visAlbum(true);
        };

        
        this.showWithout = function (album) {
            console.log(window.flickr);
            window.flickr.photosets.getPhotos({
                photoset_id: album.id
            }, function(err, result){
                if(err) { alert(err); return; }
                var arr = result.photoset.photo;
                //get size to sort
                // $.each(arr, function(i,item) {
                //     flickr.photos.getSizes({
                //         photo_id: item.id
                //     }, function(err, result){
                //         console.log(result);
                //     });
                // });
                album.allPhotos(arr);
            });
            console.log(album);
            album.visAlbum(true);
        };

        //may be those function must be out of the class
        this.getPhotoUrl = function (item){
            var url = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg'
            return url;
        }
        //sorts too may be out
        this.byName = function(a, b) {
            if(a.title._content < b.title._content){
                return -1;
            }else {
                return 1;
            }
        };

        this.byPhotos = function(a, b) {
            if(parseInt(a.photos) < parseInt(b.photos)){
                return -1;
            }else{
                return 1;
            }
        };
    };
});



        
function getPhotoUrl(item){
    var url = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg'
    return url;
}


//sorts
