---
layout: post
title: "Welcome to reactive angular programming"
date : 2017-01-21 
---

Ngrx is a library that provides angular 2 developers to build reactive applications.

[code for this tutorial](https://github.com/nathanBrenner/ngrxDemo2)

[rest api](https://github.com/SecretSantaNg2Python/secretSanta-api) that I used to demo this tutorial.

#### Purpose:
Demonstrate how to build the following features:

1. user registration, 
2. user login
3. user logout

with the angular 2 cli and material design, and ngrx store and effects.  

I'm using a very basic rest api that I wrote for this demo.
It's python with Flask.
Secret Santa but for now it's a demo and reusable code for the first thing you should do if you need authentication/authorization


#### Why?
How do you manage state in an angular application?
- share it between services?
- NGRX is a solution to this problem
What is state?
- the data in your application, or in your components

#### What?
This is not your classic angular
Flux => Redux => NGRX (redux with rxjs)
NGRX is a library with sections like 

1. Store to manage state, 

2. Effects to handle side effects (like making http requests)

3. Store-devtools: able to see what is the current state of the app

#### Angular 1 pattern:
Write the view first, business logic second

1. Write your static view, 
2. Bind your controller to your view
3. Write your service
4. User events toggle methods on services

#### Ngrx pattern:
Write the business logic first, then your views and components

1. Write your models
2. Write your events
3. Write your reducers that select on events
4. Write your services for your events
5. Write your effects
6. Build your dumb and smart componnts

#### Smart vs dumb components
Container vs child
Smart components (routable componets or root component) recieve the value of their properties direclty from the store, and they dispatch events to the reducers
Dumb components have properties and events assigned from the smart compoents
Unidirectional dataflow: no two way binding
This pattern is very much like from what you would expect with react, and I've played with both, and personally the syntacic sugar feels more comfortable in ngrx
Observables: No promises.  Observables wait for a response from the api, so the current value can be changed
RXJS: You don't have to know a lot about it, you can start using this pattern with just a couple operators (map, switchmap, of).
NGRX abstrats a lot of that heavy lifting of rxjs for you.

#### steps

###### 1. `ng new ngrxDemo`: Create a new angular cli project.

###### 2. Install dependancies for ngrx

```
npm i -S @ngrx/core @ngrx/store @ngrx/store-devtools @ngrx/effects @angular/material
```

In `app.module.ts` at the top:

```
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '@angular/material';
```

then for now just add in the store-devtools so you can pull it up:

```
imports: [
	...
	StoreDevtoolsModule.instrumentOnlyWithExtension(),
	MaterialModule.forRoot()
]
```

and I'll want the default theme for angular material, so in `styles.css`, I'll add

```
@import '~@angular/material/core/theming/prebuilt/purple-green.css'';
```

You'll also need to install the Redux Devtools Extension

Next, run `ng serve`: Start the client side app, and open browser to http://localhost:4200/
	- You should see `app works!`.  Right click, and locate `Redux DevTools`, Open that up.
	- The State panel is what I use the most, but this has a lot of additional functionality
	- Right now, it'll just show `undefined`.

###### 3. Create the shared directory, and in that directory, create dirs for effects, models, reducers, and services.

- In effects: `touch session.effects.ts`
- In models: `touch user.interface.ts` and `touch session.interface.ts`
- In reducers: `touch session.reducer.ts`
- In services: `ng g s session`, then move the spec and service into the services dir, and add it as a provider to the module.

###### 4. Next draft the user and session interfaces:

```
export interface User {
	email?: string;
	id?: number;
	password?: string;
	username?: string;
}
```

and the session interface:

```
import { User } from './user.interface'

export interface Session {
	user: User;
	token: string;
}
```

Token is for authentication, and all the properties on the User interface are optional so they don't have to have a default property.  These data structures mirror the api models. I've found building these interfaces helps with the type safety that typescript provides.

###### 5. In `session.reducer.ts`, add:

```
import { ActionReducer, Action } from '@ngrx/store';

import { Session } from '../models/session.interface';

export const SESSION_ACTIONS = {
	GET_USER: {
		ATTEMPT: 'SESSION_GET_USER_ATTEMPT',
		FAILURE: 'SESSION_GET_USER_FAILURE',
		SUCCESS: 'SESSION_GET_USER_SUCCESS'
	},
	LOGIN_USER: {
		ATTEMPT: 'SESSION_LOGIN_USER_ATTEMPT',
		FAILURE: 'SESSION_LOGIN_USER_FAILURE',
		SUCCESS: 'SESSION_LOGIN_USER_SUCCESS'
	},
	LOGOUT_USER: {
		ATTEMPT: 'SESSION_LOGOUT_USER_ATTEMPT'
	},
	REGISTER_USER: {
		ATTEMPT: 'SESSION_REGISTER_USER_ATTEMPT',
		FAILURE: 'SESSION_REGISTER_USER_FAILURE',
		SUCCESS: 'SESSION_REGISTER_USER_SUCCESS'
	},
}

const defaultSession: Session = {
	token: '',
	user: {}
}

export const sessionReducer: ActionReducer<Session> = (state: Session = defaultSession, {type, payload}: Action) => {
	console.log('action', type, payload);
	switch(type){
		case SESSION_ACTIONS.GET_USER.SUCCESS:
			return Object.assign({}, state, {user: payload});
		case SESSION_ACTIONS.LOGIN_USER.SUCCESS:
			localStorage.setItem('Authorization', payload.token);
			return Object.assign({}, state, payload);
		case SESSION_ACTIONS.LOGOUT_USER.ATTEMPT:
			localStorage.clear();
			return Object.assign({}, state, defaultSession);
		case SESSION_ACTIONS.REGISTER_USER.SUCCESS:
			localStorage.setItem('Authorization', payload.token);
			return Object.assign({}, state, payload);
		default:
			return state;
	}
}
```

This is a lot of code, and I don't write reducers like this normally. I typically start with one thing at a time, but for now this is fine.

First we import the dependancies from ngrx and the interface.
Next, we declare the actions, which are really just the action types.
Next, I declare the default session variable.

Finally the reducer: An ActionReducer, which requires a type which in this case is the Session interface, and takes 2 parameters: the state which has the interface Session and the default value, which is the defaultSession.  The second parameter is the Action.  An action has a type and a payload.  The type is what your user has done.  The payload is the data that is sent when that action is called from the smart component, or dispatched. Payload is optional, but I usually send an empty object literal in that case.

I've seen this reducer function declared in a couple different ways, and this is what I've come to like where I'm using es6 descruring and I'm defining the types fairly often.  When your application grows, the typescript is there to help debugging.

Next is a log to the console, and that's there just for debugging.  In Production, that'll be removed.

Finally the body of the function is nothing more than a switch case statement.  Each case is session action type on the success property.  With the exception of logging out, all of these methods require a request sent to the server.  That request will returna response, which is a side effect.  I don't want the state of my app to be changed by the attempt action types, because if an error response is returned I should handle that change in the state differently.

The statement in each case should be slim. You should always be returning a new version of the state and to keep the reducer function a pure fuction.  It shouldn't have any side effects like changing data anywhere else.  This is where es6 Object.assign and the spread operators become really useful.  

Object.assign takes 3 params: An empty object, the object you're copying, and optionally the property that you'd like to change on that copied object.

The last case is often the first thing you'll add when you write reducers where the default action is to return the state as it exists.  We're thinking that this app is goign to get larger and to make are reducer functions slim, we should use flat data structures.  Every time an action is dispatched, every reducer function get's called and runs through their own cases.  If the case matches, the state on that property of the store is changed, otherwise it just returns the state as it ccurrently exists.  Add on observables that can be subscribed to, and you get some great performance benifits.

###### 6. Import the SessionReducer into the AppModule and provide the SessionReducer to the StoreModule:

```
import { sessionReducer } from './shared/reducers/session.reducer';

import: [
	...
  StoreModule.provideStore({
  	session: sessionReducer
  }),
	StoreDevtoolsModule.instrumentOnlyWithExtension(),
]
```

Make sure the StoreModule is above the StoreDevtoolsModule

###### 7. So finally, let's access the store in `app.component`:

```
import { Component } from '@angular/core';
import { Store } from '@ngrx/store'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  session$;

  constructor(private _store: Store<any>){
    this.session$ = _store.select('session');
  }

}
```

Here, we've brought in Store, declared the session property, and when an instance of this class is created, the session propety is assigned with the value of the session from the state.  If you check the  Redux DevTools, it should now show the session object and if you open it up, it'll have the default values we specified in the reducer params.

If you wanted to display that data, you could change the token property in `defaultSession`, then in  your app component template, provide: `{{session.token | async}}`.  This isn't the only way to get the value, and you'll likely not be displaying properties of the store in smart components.

###### 8. Add router and some components

Now that our reducer is set up, let's demonstrate the features without using the backend. For that, we're going to need a router and some additional components: 
- container components that the user could route to: home, registration, login, page-not-found
- a navbar component to sit in the app component along with the router-outlet directive.

```
ng g c navbar
ng g c login
ng g c registration
ng g c home
```

I'll create routes for each of the container components in `app.routing.ts` and inject the router into the module.

```
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [

  { path: 'registration',  component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
```

app.module

```
imports: [
	...
	AppRoutingModule
]
```

##### 9. Build the navbar

Next, we'll add the template for the navbar component so a user can click on a button for login and registration, and see those approapriate views render. 

```
<md-toolbar color="primary">
	<a [routerLink]="['/']" md-button>NgrxDemo</a>

  <!-- This fills the remaining space of the current row -->
  <span class="fill-remaining-space"></span>
	<div *ngIf="!user.id">
		<a 
			md-raised-button 
			[routerLink]="['/registration']"
			color="accent"
			class="navBtn"
		>Registration</a>
		<a 
			md-raised-button 
			[routerLink]="['/login']" 
			color="accent"
			class="navBtn"
		>Login</a>
	</div>
	<button 
		md-raised-button
		color="accent"
		[mdMenuTriggerFor]="menu" 
		*ngIf="user.id">
   {{user.username}}
	</button>

	<md-menu #menu="mdMenu">
		<button md-menu-item> Settings </button>
		<button md-menu-item (click)="onSignOut.emit()"> Sign Out </button>
	</md-menu>
</md-toolbar>
```

I've added 4 sources of events: 3 which will change routes, and one that will emit an event `onSignOut` when the button is clicked.  I've also specified that the registration sign in anchors should only appear if there's a user id.  This is what makes the `navbar` component a dumb component.  It doesn't act on events and it doesn't get data directly from the store.  It's going get the data from it's parent component and tell the parent component about the event emitted.

In the component, we'll need to import `Input`, `Output`, `EventEmitter`, and `ChangeDetectionStrategy`.
Input: Properties that can be assigned to this component.
Output: Events that can be emitted from this component
EventEmitter: An instance of an event, basically sends up e (like from vanilla javascript dom events), and any data that you want to send with it
ChangeDetectionStrategy: Briefly, any dumb components that have Inputs need this to be set to `onPush` so that the properties of that component are only changed when an event has changed that property from the store. For a small app, this isn't important because you don't care about performance, but when you application scales up, and you find yourself with a lot more event emitters, change detection that's contantly checking every bit of data in your app is expensive on performance.

```
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() user;
  @Output() onSignOut = new EventEmitter();

  constructor() {
  }

}
```

I've also added a little bit of css to spread out the buttons in the template:

```
.fill-remaining-space {
  flex: 1 1 auto;
}

.navBtn {
  margin-right: 1rem;
}
```

Finally, lets add the `navbar` component and `router-outlet` directive to our `app` component:

```
<app-navbar 
	[user]="(session$ | async)?.user"
	(onSignOut)="onSignOut($event)"
></app-navbar>
<div>
  <router-outlet></router-outlet>
</div>
```

Here, I've assigned the `user` property from the `navBar` component to the `session$.user` property on the `app.component` with the asyn pipe to get the session.  The `?` is the safe navigation operator, which is an angular way (and I guess it's found in other languages) to guard against null and undefined values in the peroperty paths.  Without it, both Javascript and Angular throws a null reference error and the app crashes.  This is actually just something I figured out recently.  Alternatively, I could have subscribed to the store in the constructor like this:

```
_store.select('session').subscribe(session => this.user = session.user);
```

But that could become a problem if I don't unsubscribe from the store when I stop using the component.  By using the `async` pipe and the safe navigation operator, I can avoid injecting the store directly into my components.  According to Rob Wormold, that's a best practice in this case.

I've also assigned the `onSignOut` event emitter from `navbar` component to the `onSignOut` method from the `app` component.  It takes a default argument `$event`, which we'll declare now, but leave alone since we can't login or register yet, so you won't be able to run this method.

```
onSignOut(){
	// todo
}
```

Last for this step, in `app.component.css` just to add center the view:

```
:host div{
	max-width: 600px;
	margin: 10px auto;
}
```

The `:host` psudo selector is targeting the app component template.

Now you can click on any of those buttons, and you should see that the route changes.

###### 10. Dynamic forms:

So I'm going to cheat a little bit. I don't want to write a bunch of forms.  I'd rather write one form, and be able to use that form with a set of questions that I'll provide to it. It keeps my app DRY and consistent.  Conveniently, I found in the angular docs cookbook section a guide to implement just this.  I would definately encourage you to check out this section and change your instance of it to meet your needs, like I have done so it works with angular material.

This section isn't specific to ngrx, so I've added 

- components: `DynamicFormComponent` and `DynamicFormQuestionComponent`, 
- services: `QuestionService`, `QuestionControlService`
- classes: `QuestionBase`, `QuestionTextbox`

QuestionBase:

```
export class QuestionBase<T>{
	value: T;
	key: string;
	label: string;
	required: boolean;
	order: number;
	controlType: string;
	placeholder: string;

	constructor(options: {
		value?: T,
		key?: string,
		label?: string,
		required?: boolean,
		order?: number,
		controlType?: string,
		placeholder?: string,
	} = {}){
		this.value = options.value;
		this.key = options.key || '';
		this.label = options.label || '';
		this.required = !!options.required;
		this.order = options.order === undefined ? 1 : options.order;
		this.controlType = options.controlType || '';
		this.placeholder = options.placeholder;
	}
}
```

TextboxQuestion:

```
import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
```

QuestionService:

```
import { Injectable }       from '@angular/core';

import { QuestionBase }     from '../question-base';
import { TextboxQuestion }  from '../question-textbox';

@Injectable()
export class QuestionService {
  getRegistrationQuestions() {
    let questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: 'username',
        label: 'Username',
        required: true,
        type:'text',
        order: 1
      }),
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        required: true,
        type: 'text',
        order: 2
      }),
      new TextboxQuestion({
        key: 'password',
        label: 'Password',
        required: true,
        type: "password",
        order: 3
      }),
      new TextboxQuestion({
        key: 'verify_password',
        label: 'Verify Password',
        required: true,
        type: 'password',
        order: 4
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }

  getLoginQuestions() {
    let questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        required: true,
        type: 'text',
        order: 1
      }),
      new TextboxQuestion({
        key: 'password',
        label: 'Password',
        required: true,
        type: 'password',
        order: 2
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}

```

QuestionControlService:

```
import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from '../question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}

```

DynamicFormQuestionComponent:

```
import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { QuestionBase }     from '../shared/question-base';

@Component({
  selector: 'df-question',
  templateUrl: 'dynamic-form-question.component.html'
})

export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  get isValid() { return this.form.controls[this.question.key].valid; }
}

```

DynamicFormQuestion template:

```
<div [formGroup]="form">
  <div [ngSwitch]="question.controlType">
    <md-input-container>
      <input md-input *ngSwitchCase="'textbox'" 
        placeholder="{{question.label}}" 
        [formControlName]="question.key"
        [id]="question.key" 
        type="{{question.type}}"
        required>
    </md-input-container>
  </div>
</div>

```


DynamicFormComponent:

```
import { Component, Input, OnInit, EventEmitter, Output}  from '@angular/core';
import { FormGroup} from '@angular/forms';

import { QuestionBase }  from '../shared/question-base';
import { QuestionControlService } from '../shared/services/question-control.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  providers: [ QuestionControlService ]
})

export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  @Output() onSubmit = new EventEmitter();
  
  form: FormGroup;

  constructor(private qcs: QuestionControlService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
}
```

DynamicFormComponent template:

```
<div>
  <form (ngSubmit)="onSubmit.emit(form.value)" [formGroup]="form">
    <div *ngFor="let question of questions" class="form-row">
      <df-question [question]="question" [form]="form"></df-question>
    </div>
    <div class="form-row">
      <button md-raised-button type="submit" [disabled]="!form.valid">submit</button>
    </div>
  </form>
</div>

```

In short, `QuestionService` will contain methods that return a list of questions for each form that we'll need: Questions for registration, and questions for logging in.  We'll build these forms in the `dynamic-form` component, and drop them in their respective smart component.

We'll also need to import `ReactiveFormsModule` into our module from `@angular/forms`, and to add our `QuestionService` as a provider to our module.

###### 11. Build the forms for registration and login:

registration component template:

```
<md-card>
	<md-card-title>Registration</md-card-title>
	<md-card-content>
		<dynamic-form 
			[questions]="questions" 
			(onSubmit)="onSubmitRegistrationForm($event)"
		></dynamic-form>
	</md-card-content>
</md-card>
```

then in the component:

```
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { QuestionService } from '../shared/services/question.service';
import { SESSION_ACTIONS } from '../shared/reducers/session.reducer';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  questions: any[];

  constructor(
    private questionService: QuestionService, 
    private _store: Store<any>,
    private router: Router
  ) {
	  this.questions = questionService.getRegistrationQuestions();
  }

  ngOnInit() {
  }

  onSubmitRegistrationForm(payload){
    this._store.dispatch({
      type: SESSION_ACTIONS.REGISTER_USER.ATTEMPT,
      payload: payload
    });
    setTimeout(() => this.router.navigate(['/']), 2000);
  }
}
```

Here, we've imported the Store so we can dispatch an action when the dynamic form has been submitted.  The form get's it's questions from the questionService.

Check the browser and you should see your registration page with 4 fields.

A couple things to try when you do this on your own: 

- log out to the console the payload to make sure the object you want to send is what you expect.
- dispatch the success action to see the store change.  You should see a debugging message in the console, and the redux devtools should show the updated state.

Now when you fill out the form, the state will change, and you'll be redirected to the login. Now for the login component:

```
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { QuestionService } from '../shared/services/question.service';
import { SESSION_ACTIONS } from '../shared/reducers/session.reducer';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  questions: any[];

  constructor(
    private questionService: QuestionService,
    private _store: Store<any>,
    private router: Router
  ) {
	  this.questions = questionService.getLoginQuestions();
  }

  ngOnInit() {
  }

  onSubmitLoginForm(payload){
    this._store.dispatch({
      type: SESSION_ACTIONS.LOGIN_USER.ATTEMPT,
      payload: payload
    })
    setTimeout(() => this.router.navigate(['/']), 2000);
  }

}
```

login template:

```
<md-card>
	<md-card-title>Login</md-card-title>
	<md-card-content>
		<dynamic-form 
			[questions]="questions"
			(onSubmit)="onSubmitLoginForm($event)"
		></dynamic-form>
	</md-card-content>
</md-card>
```

-- Note: You'll probably notice that the password field isn't reflecting it's type.  That's a bug on angular material.  I played around with it for a bit on last Saturday and couldn't get it to work.  Probably need to create an issue.

###### 12. Adding htmlwrapper service and api endpoint:
For our services, we're going to use something I've written that abstracts away a lot of the repetition in making http requests.  This particular service works with my rest api for handling token based authentication and handling events with ngrx effects, which we'll do next.

HttpWrapperService:

```
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import { API_ENDPOINT } from '../api';
import { ERROR_ACTIONS } from '../reducers/error.reducer';
import { HttpParams } from '../models/httpParams.interface';

@Injectable()
export class HttpWrapperService {
  /*
    These are the methods that are used in the additional services, 
    where otherwise they would require importing angular 2 http module.

    This keeps the services DRY, easier to test, and scalable.

  */

  constructor(private http: Http) { }

  private configRequest(uri: string, authRequired: boolean = false): {apiUrl: string, options: RequestOptions} {
    let apiUrl = `${API_ENDPOINT()}/${uri}`;

    let headers = authRequired ? 
      new Headers({
        'Content-Type': 'application/json',
        'Authorization' : `token ${localStorage['Authorization']}`
      }) : 
      new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return {apiUrl, options};
  }

  public delete(params: HttpParams){
    let {apiUrl, options} = this.configRequest(params.uri, true)

    return this.http.delete(apiUrl, options)
      .map(res => ({
        type: params.successActionType,
        payload: res.json()[params.responseObject]
      }))
      .catch(res => Observable.of({
        type: ERROR_ACTIONS.REPORT_ERROR,
        payload: {
          action_type: params.errorActionType,
          message: res.json().error
        }
      }));
  }

  public get(params: HttpParams){
    let {apiUrl, options} = this.configRequest(params.uri, params.auth)

    return this.http.get(apiUrl, options)
      .map(res => ({
        type: params.successActionType,
        payload: res.json()[params.responseObject]
      }))
      .catch(res => Observable.of({
        type: ERROR_ACTIONS.REPORT_ERROR,
        payload: {
          action_type: params.errorActionType,
          message: res.json()
        }
      }))
  }

  public post(params: HttpParams){

    let {apiUrl, options} = this.configRequest(params.uri, params.auth)
    
    return this.http.post(apiUrl, params.payload, options)
      .map(res => ({
        type: params.successActionType,
        payload: res.json()[params.responseObject]
      }))
      .catch(res => Observable.of({
        type: ERROR_ACTIONS.REPORT_ERROR,
        payload: {
          action_type: params.errorActionType,
          message: res.json().error
        }
      }));
  }

  put(params: HttpParams){
    let {apiUrl, options} = this.configRequest(params.uri, true)

    return this.http.put(apiUrl, params.payload, options)
      .map(res => ({
        type: params.successActionType,
        payload: res.json()[params.responseObject]
      }))
      .catch(res => Observable.of({
        type: ERROR_ACTIONS.REPORT_ERROR,
        payload: {
          action_type: params.errorActionType,
          message: res.json().error
        }
      }));
  }
}
```

I've also added an error reducer, an error interface, a api endpoint constant, and a httpParams interface.

error interface:

```
export interface Error {
	action_type: string,
	id: number,
	message: string
}
```

error reducer:

```
import { ActionReducer, Action} from '@ngrx/store';

import { Error } from '../models/error.interface';

export const ERROR_ACTIONS = {
	REPORT_ERROR: 'REPORT_ERROR',
	REMOVE_ERROR: 'REMOVE_ERROR'
}

export const errorReducer: ActionReducer<Error[]> = (state: Error[] = [], {type, payload}: Action) => {
	switch(type){
		case ERROR_ACTIONS.REPORT_ERROR:
			let id = Math.floor(Math.random() * 1000);
			payload.id = id;
			return [...state, payload]
		case ERROR_ACTIONS.REMOVE_ERROR:
			return state.filter(error => error.id != payload.id);
		default:
			return state;
	}
}

```

api.ts

```
export const API_ENDPOINT = () => {
	return document.URL.split('/')[2] == 'localhost:4200' 
		? 
		'http://127.0.0.1:8000/api/v1' 
		: 
		'todo: add production server'
}
```

httpParams interface

```
export interface HttpParams {
	auth?: boolean, // on true, then the token will be on the header. Optional (not needed for all post and get requests)
	errorActionType: string, // the failure action, should look something like `ACTION_TYPES.ACTION_TYPE.FAILURE`
	payload?: {}, // what you're sending on the http request, should be data from a form. Optional: not needed for get and delete requests
	responseObject: string, // this should be a property on the success resposonse body object
	successActionType: string, // If the http responce is a success, send this action type to the reducer, should be something like `ACTION_TYPES.ACTION_TYPE.SUCCESS`
	uri: string, // the api endpoint
}
```

In this case, we only really care about the post method. We have a private method `configRequest`, which returns our headers and api uri endpoint, and I've used destructuring to return the local variables I would need from the results of the `configRequest`.  We've also imported Angular Http, which returns an Observable.  On the http.post, there is a success response handled with rxjs `map` operator, and the error response is handled with rxjs `catch` operator. Both send back an observable, which is then handled in the reducer functions.  

###### 13. Next we are going to write up the session service to handle the `success` and `failure` actions.

```
import { Injectable } from '@angular/core';

import { HttpWrapperService } from './http-wrapper.service';
import { SESSION_ACTIONS } from '../reducers/session.reducer';
import { HttpParams } from '../models/httpParams.interface';

@Injectable()
export class SessionService {

  constructor(private httpWrapperService: HttpWrapperService) {}

  getUser(){
    let getParams: HttpParams = {
      auth: true,
      errorActionType: SESSION_ACTIONS.GET_USER.FAILURE,
      responseObject: 'user',
      successActionType: SESSION_ACTIONS.GET_USER.SUCCESS,
      uri: 'user'
    }
    return this.httpWrapperService.get(getParams);
  }

  loginUser(payload: {email: string, password: string}){
    let postParams: HttpParams = {
      auth: false,
      errorActionType: SESSION_ACTIONS.LOGIN_USER.FAILURE,
      payload: payload,
      responseObject: 'account',
      successActionType: SESSION_ACTIONS.LOGIN_USER.SUCCESS,
      uri: 'user'
    }
    return this.httpWrapperService.post(postParams);
  }

  registerUser(payload: {username: string, email: string, password: string, verify_password: string}){
    let postParams: HttpParams = {
      auth: false,
      errorActionType: SESSION_ACTIONS.REGISTER_USER.FAILURE,
      payload: payload,
      responseObject: 'account',
      successActionType: SESSION_ACTIONS.REGISTER_USER.SUCCESS,
      uri: 'users'
    }
    return this.httpWrapperService.post(postParams)
  }

}
```

This service handles 3 types of requests:

1. Getting a user: If a user has logged in, and refreshes the page or navigates to another website then comes back, if the token hasn't expired, the session will persist.
2. Login user
3. Register user

Each wires up an object, and returns a method to the http wrapper with that object as it's argument.

###### 14. The last step to make this work is to add in ngrx effects.
session.effects:

```
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Actions, Effect } from '@ngrx/effects';

import { SessionService } from '../services/session.service';
import { SESSION_ACTIONS } from '../reducers/session.reducer';

@Injectable()
export class SessionEffects {
	
	constructor(
		private sessionService: SessionService,
		private actions$: Actions,
	){}

	@Effect() getUser$ = this.actions$
		.ofType(SESSION_ACTIONS.GET_USER.ATTEMPT)
		.map(action => action.payload)
		.switchMap(payload => this.sessionService.getUser())

	@Effect() loginUser$ = this.actions$
		.ofType(SESSION_ACTIONS.LOGIN_USER.ATTEMPT)
		.map(action => action.payload)
		.switchMap(payload => this.sessionService.loginUser(payload));

	@Effect() registerUser$ = this.actions$
		.ofType(SESSION_ACTIONS.REGISTER_USER.ATTEMPT)
		.map(action => action.payload)
		.switchMap(payload => this.sessionService.registerUser(payload));
}
```

We need effects because we have to handle side effects.  When the user submits a form, we're invoking the store to dispatch an `attempt` action, which is basically an http requests.  So here, when the attempt action is fired, the approapriate effect uses `switchmap` from ngrx to change streams and send that payload to the service.  Remember then, the service will update the state by changing the `session` or the `error`.

To make this work, we'll need to run our session effects in our module:

```
imports: [
	EffectsModule.run(SessionEffects),
]
```

Let's try this out:

- Make sure the rest api is running as expected with postman:

```
source env/bin/activate
python app.py
```

Register a user works! State has been updated, as you can see from the redux devtools, postman, and the ui has changed.

##### 17 Persist the session

To keep going: 
- onInit in app.component, check if there's a token in localStorage.  If there is, dispatch an action to get the user.
- Add a method on app.component to logout the user

updated app.component:

```
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'

import { SESSION_ACTIONS } from './shared/reducers/session.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  session$;

  checkLocalStorage(){
    if (localStorage['Authorization']) return this.getUser();
  }

  constructor(private _store: Store<any>){
    this.session$ = _store.select('session');
  }

  getUser(){
    this._store.dispatch({
      type: SESSION_ACTIONS.GET_USER.ATTEMPT,
      payload: {}
    });
  }

  ngOnInit(){
    this.checkLocalStorage();
  }

  onSignOut(){
    this._store.dispatch({
      type: SESSION_ACTIONS.LOGOUT_USER.ATTEMPT,
      payload: {}
    });
  }
}
```

Further enhancements for you to try:
- add an dumb component, and subscribe to the error property in the store, pass that data up to the error component which shows any errors that occur and removes them with setTimeout
- Add a success component that mirrors the error component.
- Write unit tests
- Add additional features to the specific app

#### Resources:
[ngrx](https://github.com/ngrx)

[angular-cli](https://github.com/angular/angular-cli)

[redux-devtools-extension](http://zalmoxisus.github.io/redux-devtools-extension/)

[dynamic forms](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html)

[angular material](https://material.angular.io/)

[dynamic forms](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html)
