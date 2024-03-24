import { TestBed } from "@angular/core/testing"
import { ApiService } from "./api.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TagInterface } from "./tag.interface";
import { response } from "express";
import { HttpErrorResponse } from "@angular/common/http";

describe('ApiService', () => {
    let apiService: ApiService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ApiService
            ]
        })
        apiService = TestBed.inject(ApiService)
        httpTestingController = TestBed.inject(HttpTestingController)
    
    })
    afterEach(() => {
        httpTestingController.verify()
    })
    it('should be created', () => {
        expect(apiService).toBeTruthy()
    })
    describe('getTags', () => {
        it('should return a list of tags', () => {
            let tags: TagInterface[] | undefined; // testing subscribe
             apiService.getTags().subscribe(response => {
                tags = response; // here we assign the response to the tags variable
             })
             const req = httpTestingController.expectOne('http://localhost:3004/tags') // here we define the expected request
                req.flush([{ id: '1', name: 'tag1' }]) // here we define the response
             expect(tags).toEqual([{ id: '1', name: 'tag1' }]) // here we test the response
        })
    })
    describe('createTag', () => {
        it('should create a tag', () => {
            let tag: TagInterface | undefined; // we need to create a variable to store the response
            apiService.createTag('tag1').subscribe(response => {
                tag = response;
            })
            const req = httpTestingController.expectOne('http://localhost:3004/tags')
            req.flush({ id: '1', name: 'tag1' })
            expect(tag).toEqual({ id: '1', name: 'tag1' }) // it isnt an array anymore
        })
        it('passes the correct body', () => {
            let tag: TagInterface | undefined; // we need to create a variable to store the response
            apiService.createTag('tag1').subscribe(response => {
                tag = response;
            })
            const req = httpTestingController.expectOne('http://localhost:3004/tags')
            req.flush({ id: '1', name: 'tag1' })
            expect(req.request.method).toEqual('POST')
        })
        it('throws an error if api fails', () => {
            let actualError: HttpErrorResponse | undefined;
            apiService.createTag('tag1').subscribe({
                next: () => {
                    fail('Success should not be called')
                },
                error: (error) => {
                    actualError = error;
                }
            })
            const req = httpTestingController.expectOne('http://localhost:3004/tags')
            req.flush('Server Error', { 
                status: 422, statusText: 'Unprocessible entity',
            })
            if(!actualError){
                throw new Error('Expected an error')
            }
            expect(actualError.status).toEqual(422)
            expect(actualError.statusText).toEqual('Unprocessible entity')
        })
    })
}) 