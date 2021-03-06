# Image Upload Module
[![Build Status](https://travis-ci.org/aberezkin/ng2-image-upload.svg?branch=master)](https://travis-ci.org/aberezkin/ng2-image-upload)

This angular library provides a light-weight component that handles file-drop, image previewing and image uploading.

### [Demo](https://aberezkin.github.io/ng2-image-upload/)

### Install

`npm install angular2-image-upload --save`

### Usage

In your `app.module.ts` import it using `@NgModule` decorator.

    @NgModule({
        imports: [
            ...,
            ImageUploadModule.forRoot(),
            ...
        ]
    })

Now you have `image-upload` declaration and you can use it in your html code.

    <image-upload></image-upload>

You can use bindings to configure this element for your needs.

#### General customization

`[max]="100"` - is the maximum number of pictures that can be uploaded through this element. Default is 100.

`[url]="'example.com/images/upload'"` - this is the url which can handle POST queries with `multipart/form-data` 
Content-Type. The query has a single field called `image`.

**Note:** images are sent individually one by one!

`[preview]="false"` - you can disable images preview.

`[maxFileSize]="1048576"` - the maximum file size that will be accepted, in bytes. No default (any size permitted).

`[extensions]="['jpg','png','gif']"` - upload images with specific extensions. Default all extensions `image/*` is allowed.

#### Custom headers

If you need to send some headers with your request (for example `Authorization` headers), 
you can use `[headers]` directive like this.

    <image-upload 
      [url]="'my-url.com'"
      [headers]="{Authorization: 'MyToken'}">
    </image-upload>

**Note** that headers are sent only if you provide a url.

#### Custom messages

`[buttonCaption]="'Select Images'"` - that is a button caption. Default is "**Select Images**". Note that letters on the button are all caps.

`[dropBoxMessage]="'Drop your images here!'"` - this is a message that is shown in drop area. Default is "**Drop your images here!**".

`[fileTooLargeMessage]="'Image too large!'"` - message that is shown if the user selects/drops an image that exceeds `maxFileSize`. Default is "**An image was too large and was not uploaded. The maximum file size is x KiB.**".

`[clearButtonCaption]="'Clear'"` - Text shown on the "Clear" button. Default is "**Clear**".

#### Events

`(uploadFinished)="onUploadFinished($event)"`. If `[url]` is specified this event is fired when component gets a response from the server, also in this case event has field `serverResponse` which contains the status code and response from the server `{status, response}`. If `[url]` is not specified it's fired immediately after an image(s) dropped into file-drop zone of choosed in file browser. So what you can do, is not specify `[url]` to handle upload yourself, for exapmple send the image into firebase storage. To get file use `event.file`.

`(removed)="onRemoved($event)"` - this event is fired when remove or clear button was clicked and the image preview was removed. *Note that this library doesn't handle deletion from server so you should do it yourself*. Event passed as the argument is the exact same object that was passed to the `(imageUploaded)` callback when image was added so you can access `serverResponse` to get a key to delete your image from server.

`(uploadStateChanged)="onUploadStateChanged($event)"` - this event is fired when image upload state was changed. Event is just a boolean that represents the uploading state. Image upload state is `true` when and only when component awaits the response from the server, and `false` otherwise. You can use it, for example, to disable send button in your form until all images are uploaded.

In the final state it should look something like this:

    <image-upload
      [max]="100"
      [url]="'example.com/images/upload'"
      [headers]="{Authorization: 'MyToken'}"
      [buttonCaption]="'Select Images!'"
      [dropBoxMessage]="'Drop your images here!'"
      [extensions]="['jpg','png','gif']"
      (removed)="onRemoved($event)"
      (uploadFinished)="onUploadFinished($event)"
      (uploadStateChanged)="onUploadStateChanged($event)">
    </image-upload>

# Contributors

@aberezkin
@UncleDave
