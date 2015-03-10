package org.kub.web.common.mapmarker.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;


/**
 * The persistent class for the Categories database table.
 * 
 */
@Entity
@Table(name="Categories")
//@NamedQuery(name="Category.findAll", query="SELECT c FROM Category c")
@NamedQueries({
    @NamedQuery(name="Category.getListAll", query="SELECT n FROM Category n ORDER BY n.createdDate ASC"),
    @NamedQuery(name="Category.getCountAll", query="SELECT COUNT(n) FROM Category n")
})
public class Category implements Serializable {
	private static final long serialVersionUID = 1L;
	private long id;
	private String createdBy;
	private Date createdDate;
	private String description;
	private String editedBy;
	private Date editedDate;
	private boolean isActive;
	private String symbology;
	private String title;
	
	public Category() {
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}


	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}


	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}


	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	public String getEditedBy() {
		return this.editedBy;
	}

	public void setEditedBy(String editedBy) {
		this.editedBy = editedBy;
	}


	public Date getEditedDate() {
		return this.editedDate;
	}

	public void setEditedDate(Date editedDate) {
		this.editedDate = editedDate;
	}


	public boolean getIsActive() {
		return this.isActive;
	}

	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}


	@Lob
	public String getSymbology() {
		return this.symbology;
	}

	public void setSymbology(String symbology) {
		this.symbology = symbology;
	}


	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}



}