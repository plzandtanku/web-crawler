import React, { Component } from 'react';
import request from 'request'
//import './Crawler.css';

class Crawler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      startUrl: '',
      result: '',
    };
		
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

		this.urls = [];
  }
  handleChange(event) {
    this.setState({
			[event.target.name]: event.target.value,
		});
  }
  handleSubmit(event) {
    event.preventDefault();
	
    if (!this.state.startUrl) {
	//		this.setState({
		//		startUrl : "https://en.wikipedia.org/wiki/SpongeBob_SquarePants"
			//	});
			this.urls=["https://en.wikipedia.org/wiki/SpongeBob_SquarePants"];
		}
	else {
		this.urls = [this.state.startUrl];
	}

	console.log(this.urls);
	this.setState({
		result: "Running query, plz wait...",
	});
	this.search(this.state.query);
  }
  search(q) {
  	if (this.urls.length < 1) return;
  	let bypass = "https://cors-anywhere.herokuapp.com/";
  	let re = new RegExp(q);
  	let url = this.urls[0];
	//https://stackoverflow.com/questions/24710989/how-do-i-make-http-requests-inside-a-loop-in-nodejs
	request(bypass+url, (err, res, body) => {
		this.urls.shift();
		//		console.log(url);
		//	console.log(this.urls.length);
		if (body.match(re)){
			console.log("ya burnt");
			console.log(url);
			this.setState({
				result : url
			});

			this.urls = [];
			return url;
		} 
		else {
			let test = document.createElement('html');
			test.innerHTML = body;
			let x = Array.from(test.getElementsByTagName('a'));
			//	for (let i=0; i < x.length;i++){
			if (x !== undefined && x.length > 0) {
				for (let i=0; i < x.length;i++){
					if (x[i].hasAttribute("href")) {
						let link = x[i].getAttribute("href");
						this.urls.push(link);
					}
				}
			}
		}
		this.search(q);
	});
  }
	
  render() {
    return (
      <div className="Crawler">
        <form onSubmit={this.handleSubmit}>
          <label>
            Text To Search:
            <input type="text" name="query" value={this.state.query} onChange={this.handleChange} />
          </label>
          <label>
            Starting URL:
            <input type="text" name="startUrl" value={this.state.startUrl} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p> hello moto </p>
				<p> {this.state.result} </p>
      </div>
    );
  }
}

export default Crawler;
