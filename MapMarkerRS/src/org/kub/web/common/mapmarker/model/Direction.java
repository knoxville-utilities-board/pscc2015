package org.kub.web.common.mapmarker.model;

import java.io.Serializable;

import javax.persistence.*;

import java.util.Date;


/**
 * The persistent class for the Directions database table.
 * 
 */
@Entity
@Table(name="Directions")
//@NamedQuery(name="Direction.findAll", query="SELECT d FROM Direction d")
@NamedQueries({
    @NamedQuery(name="Direction.getListAll", query="SELECT n FROM Direction n ORDER BY n.createdDate ASC"),
    @NamedQuery(name="Direction.getCountAll", query="SELECT COUNT(n) FROM Direction n")
})
public class Direction implements Serializable {
	private static final long serialVersionUID = 1L;
	private long id;
	private String createdBy;
	private Date createdDate;
	private String description;
	private String editedBy;
	private Date editedDate;
	private boolean isActive;
	private String title;

	public Direction() {
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


	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}