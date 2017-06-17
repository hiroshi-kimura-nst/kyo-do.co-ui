import assert from 'power-assert';
import groupboards from '../../src/reducer/groupboards';
import {
  openGroupCreationBoard,
  closeGroupCreationBoard,
  openGroupManagementBoard,
  closeGroupManagementBoard
} from '../../src/action/groupboards';

/** @test {groupboards} */
describe("groupboards reducer",()=>{
  it("sets creationBoard.isOpen state to true when OPEN_GROUP_CREATION_BOARD action is passed",()=>{
    const action = openGroupCreationBoard();

    const dummyCurrentState = {
      creationBoard:{
        isOpen:false
      },
      managementBoard:{
        isOpen:false,
        group:{}
      }
    };

    const result = groupboards(dummyCurrentState,action);

    assert(result.creationBoard.isOpen === true);
    assert.deepEqual(result.managementBoard, dummyCurrentState.managementBoard);
  });

  it("sets creationBoard.isOpen state to false when CLOSE_GROUP_CREATION_BOARD action is passed",()=>{
    const action = closeGroupCreationBoard();

    const dummyCurrentState = {
      creationBoard:{
        isOpen:true
      },
      managementBoard:{
        isOpen:false,
        group:{}
      }
    };

    const result = groupboards(dummyCurrentState,action);

    assert(result.creationBoard.isOpen === false);
    assert.deepEqual(result.managementBoard, dummyCurrentState.managementBoard);
  });

  it("sets managementBoard.isOpen state to true and managementBoard.group to action's payload if OPEN_GROUP_MANAGEMENT_BOARD action is passed",()=>{
    const dummyGroup = {
      id:"group_id_1",
      name:"グループ1",
      members:[
        {
          id:"member1",
          name:"メンバー1",
          isAdmin:true
        },
        {
          id:"member2",
          name:"メンバー2",
          isAdmin:false
        },
      ]
    };

    const action = openGroupManagementBoard(dummyGroup);

    const dummyCurrentState = {
      creationBoard:{
        isOpen:false
      },
      managementBoard:{
        isOpen:false,
        group:{}
      }
    };

    const result = groupboards(dummyCurrentState,action);

    assert(result.managementBoard.isOpen === true);
    assert.deepEqual(result.managementBoard.group, dummyGroup);
    assert.deepEqual(result.creationBoard, dummyCurrentState.creationBoard);
  });

  it("sets managementBoard.isOpen state to false and managementBoard.group state to empty if CLOSE_GROUP_MANAGEMENT_BOARD action is passed",()=>{
    const action = closeGroupManagementBoard();

    const dummyCurrentState = {
      creationBoard:{
        isOpen:false
      },
      managementBoard:{
        isOpen:true,
        group:{
          id:"group_id_1",
          name:"グループ1",
          members:[
            {
              id:"member1",
              name:"メンバー1",
              isAdmin:true
            },
            {
              id:"member2",
              name:"メンバー2",
              isAdmin:false
            },
          ]
        }
      }
    };

    const result = groupboards(dummyCurrentState,action);

    assert(result.managementBoard.isOpen === false);
    assert.deepEqual(result.managementBoard.group, {});
    assert.deepEqual(result.creationBoard,dummyCurrentState.creationBoard);
  });

  it("does nothing if any other action is passed",()=>{
    const action = {type:"DUMMY_ACTION_NAME"};

    const dummyCurrentState = {
      creationBoard:{
        isOpen:false
      },
      managementBoard:{
        isOpen:true,
        group:{
          id:"group_id_1",
          name:"グループ1",
          members:[
            {
              id:"member1",
              name:"メンバー1",
              isAdmin:true
            },
            {
              id:"member2",
              name:"メンバー2",
              isAdmin:false
            },
          ]
        }
      }
    };

    const result = groupboards(dummyCurrentState,action);

    assert.deepEqual(result, dummyCurrentState);
  });
});
