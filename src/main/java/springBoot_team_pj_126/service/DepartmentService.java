package springBoot_team_pj_126.service;
// 부서관리용 서비스 생성(2023-05-04_김희수)

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import springBoot_team_pj_126.dto.DeptDTO;


public interface DepartmentService {

   public List<DeptDTO> DepartmentList(HttpServletRequest req, Model model) 
         throws ServletException, IOException;
   
   public void addDepartment(DeptDTO dto) throws ServletException, IOException;
   
//   //2023-05-09 김희수 추가
//   public void editDepartment(DeptDTO dto) 
//         throws ServletException, IOException; 
   
   //2023-05-11 김희수 추가
   public void deleteDepartment(int deptid) 
         throws ServletException, IOException;

   // 2023-5-15 추가
   public ArrayList<String> positionData();

   // 2023-5-15 추가
   public void updatePosition(Map<String, Object> map); 
}