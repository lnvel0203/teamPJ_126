package springBoot_team_pj_126.service;
// 부서관리용 서비스 생성(2023-05-04_김희수)

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import springBoot_team_pj_126.dao.DepartmentMapper;
import springBoot_team_pj_126.dto.DeptDTO;

@Service
public class DepartmentServiceImpl implements DepartmentService {

   @Autowired
   private DepartmentMapper mapper;
   
   @Override
   public List<DeptDTO> DepartmentList(HttpServletRequest req, Model model) 
         throws ServletException, IOException {
      System.out.println("<<< 서비스 - 부서리스트 >>>");

      List<DeptDTO> list = mapper.departmentList();
   
      return list;
   }

   @Override
   public void addDepartment(DeptDTO dto) 
         throws ServletException, IOException {
      System.out.println("<<< 서비스 - 부서추가 >>>");
      
      mapper.addDeptment(dto);
      
   }

//   //2023-05-09 김희수 추가
//   @Override
//   public void editDepartment(DeptDTO dto) 
//         throws ServletException, IOException {
//      System.out.println("<<< 서비스 - 부서수정 >>>");
//      
//      mapper.editDepartment(dto);
//      
//   }

   //2023-05-11 김희수 추가
   @Override
   public void deleteDepartment(int deptid) 
         throws ServletException, IOException {
      System.out.println("<<< 서비스 - 부서삭제 >>>");
      
      mapper.deleteDepartment(deptid);
   }
   
   // 2023-5-15 추가
   @Override
   public ArrayList<String> positionData() {
      System.out.println("<<< 서비스 - 부장 리스트 >>>");
      
      ArrayList<String> list = mapper.positionData();
      
      return list;
   }

   @Override
   public void updatePosition(Map<String, Object> map) {
      System.out.println("<<< 서비스 - 부장 리스트 >>>");
      
      Map<String, Object> data = (Map<String, Object>) map.get("sendData");
      System.out.println(data.get("deptId"));
      
      mapper.updatePosition(data);
   }

   
}