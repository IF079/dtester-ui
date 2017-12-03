
import {mockedForRequest, mockedResponse} from '../../../../../mocks/DeleteUpdate/deleteUpdate.mock.constants';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {Group} from '../../groups/group';

import {url} from '../../shared/constants/url-constants';
import {UpdateDeleteEntityService} from './update-delete-entity.service';

describe('Delete Update Service Service', () => {
  let httpMock: HttpTestingController;
  let updateDeleteEntityService: UpdateDeleteEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [UpdateDeleteEntityService]
    });

    updateDeleteEntityService = TestBed.get(UpdateDeleteEntityService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([UpdateDeleteEntityService], (service: UpdateDeleteEntityService) => {
    expect(service).toBeTruthy();
  }));
  it('should pass updated item and then you can subscribe for  item that has been passed', () => {
     updateDeleteEntityService.passUpdatedItem<Group[]>(mockedResponse.updatedItem);
     updateDeleteEntityService.itemUpdated$.subscribe((resp: Group[]) => {
       expect(mockedResponse.updatedItem).toEqual(resp);
     });
  });
  it('should pass inserted item and then you can subscribe for item that has been passed', () => {
    updateDeleteEntityService.passInsertedItem<Group[]>(mockedResponse.insetedItem);
    updateDeleteEntityService.itemInserted$.subscribe((resp: Group[]) => {
      expect(mockedResponse.insetedItem).toEqual(resp);
    });
  });
  it('should pass deleted item and then you can subscribe for item that has been passed', () => {
    updateDeleteEntityService.passDeleted(mockedResponse.deletedItem);
    updateDeleteEntityService.itemDeleted$.subscribe((resp: Group[]) => {
      expect(mockedResponse.deletedItem).toEqual(resp);
    });
  });

  it('should give response ok after successful delete', () => {

    updateDeleteEntityService.deleteEntity(mockedForRequest.id, mockedForRequest.entityName).subscribe((resp) => {
      expect(resp.response).toEqual(mockedResponse.afterDelete.response);
    });

    const deleteEntityRequest = httpMock.expectOne(`/${mockedForRequest.entityName}${url.delete}/${mockedForRequest.id}`);
    deleteEntityRequest.flush(mockedResponse.afterDelete);
    httpMock.verify();
  });

  it('should give response of group id, group name, speciality id, faculty id', () => {

    updateDeleteEntityService.updateEntity(mockedForRequest.id, mockedForRequest.entityName, mockedForRequest.updateData).subscribe((resp) => {
      expect(resp[0].group_id).toEqual(mockedResponse.afterUpdate[0].group_id);
      expect(resp[0].group_name).toEqual(mockedResponse.afterUpdate[0].group_name);
      expect(resp[0].speciality_id).toEqual(mockedResponse.afterUpdate[0].speciality_id);
      expect(resp[0].faculty_id).toEqual(mockedResponse.afterUpdate[0].faculty_id);
    });

    const updateEntityRequest = httpMock.expectOne(`/${mockedForRequest.entityName}${url.update}/${mockedForRequest.id}`);
    updateEntityRequest.flush(mockedResponse.afterUpdate);
    httpMock.verify();
  });


});
